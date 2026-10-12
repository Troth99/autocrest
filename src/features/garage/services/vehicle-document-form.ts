import type { VehicleDocumentDetails } from "@/features/garage/validators/vehicle-document.validator";
import type { VehicleDocumentFormValues } from "@/features/garage/types/vehicle-document-form";
import type {
  VehicleMake,
  VehicleModel,
} from "@/features/garage/types/vehicle-catalog";

export function normalizeCatalogName(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]/gu, "");
}


const makeAliases: Record<string, string[]> = {
  audi: ["\u0430\u0443\u0434\u0438"],
  citroen: ["\u0441\u0438\u0442\u0440\u043e\u0435\u043d"],
  peugeot: ["\u043f\u0435\u0436\u043e"],
  renault: ["рено"],
  bmw: ["бмв"],
  mercedesbenz: ["мерцедес", "мерцедес бенц", "Mercedes"],
  toyota: ["тойота"],
  ford: ["форд"],
  opel: ["опел"],
  skoda: ["шкода"],
  nissan: ["нисан", "ниссан"],
  honda: ["хонда"],
  hyundai: ["хюндай", "хюндаи"],
  kia: ["киа", "кия"],
  mazda: ["мазда"],
  volvo: ["волво"],
  fiat: ["фиат"],
  seat: ["сеат"],
  dacia: ["дачия", "дачиа"],
  suzuki: ["сузуки"],
  mitsubishi: ["мицубиши"],
  chevrolet: ["шевролет"],
  landrover: ["ланд ровер"],
  alfaromeo: ["алфа ромео"],
  volkswagen: ["VW", "\u0444\u043e\u043b\u043a\u0441\u0432\u0430\u0433\u0435\u043d"],
};

function makeNames(name: string) {
  const normalized = normalizeCatalogName(name);
  return [name, ...(makeAliases[normalized] ?? [])];
}

function printedModelNames(printed: string, catalogMake: string) {
  const words = printed.trim().split(/[\s/|,;]+/);
  const names = makeNames(catalogMake);
  const starts: { index: number; length: number }[] = [];
  for (let index = 0; index < words.length; index += 1) {
    for (const name of names) {
      const length = name.trim().split(/\s+/).length;
      if (normalizeCatalogName(words.slice(index, index + length).join(" ")) === normalizeCatalogName(name)) {
        starts.push({ index, length });
        break;
      }
    }
  }
  return starts.map((start, index) => words.slice(start.index + start.length, starts[index + 1]?.index ?? words.length).join(" ")).filter(Boolean);
}

export function findDocumentMake(name: string, makes: VehicleMake[]) {
  const normalized = normalizeCatalogName(name);
  const exact = makes.filter((make) => makeNames(make.name).some((alias) => normalizeCatalogName(alias) === normalized));
  if (exact.length) return exact.length === 1 ? exact[0] : undefined;
  const candidates = makes.filter((make) => printedModelNames(name, make.name).length > 0);
  return candidates.length === 1 ? candidates[0] : undefined;
}

export function getDocumentModelName(model: string | null, printedMake: string, catalogMake: string) {
  return model ?? printedModelNames(printedMake, catalogMake)[0] ?? null;
}

function modelKeys(name: string) {
  const normalized = normalizeCatalogName(name);
  // Letter/number model codes may use Cyrillic lookalikes, e.g. A6 or C4.
  const letters: Record<string, string> = {
    "\u0430": "a", "\u0432": "b", "\u0441": "c", "\u0446": "c",
    "\u0435": "e", "\u043d": "h", "\u043a": "k", "\u043c": "m",
    "\u043e": "o", "\u0440": "p", "\u0442": "t", "\u0445": "x", "\u0443": "y",
  };
  const code = /^[\p{L}]{1,3}\d+[\p{L}\d]*$/u.test(normalized)
    ? normalized.replace(/[\u0430-\u044f]/g, (letter) => letters[letter] ?? letter)
    : normalized;
  const transliteration: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z",
    и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p",
    р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch",
    ш: "sh", щ: "sht", ъ: "a", ь: "", ю: "yu", я: "ya",
  };
  const latin = normalized.replace(/[а-я]/g, (letter) => transliteration[letter] ?? letter);
  return [normalized, code, latin];
}

export function findDocumentModel(name: string, models: VehicleModel[], printedMake?: string | null, catalogMake?: string) {
  const match = (names: string[]) => {
    const keys = names.flatMap(modelKeys);
    const candidates = models.filter((model) => keys.includes(normalizeCatalogName(model.name)));
    return candidates.length === 1 ? candidates[0] : undefined;
  };
  const exact = match([name]);
  if (exact) return exact;
  if (!catalogMake) return undefined;
  return match([...printedModelNames(name, catalogMake), ...printedModelNames(printedMake ?? "", catalogMake)]);
}

export function mapDocumentToForm(details: VehicleDocumentDetails) {
  const values: Partial<VehicleDocumentFormValues> = {};
  if (details.registration_plate !== null)
    values.plate = details.registration_plate;
  if (details.vin !== null) values.vin = details.vin;
  if (details.registration_certificate_number !== null)
    values.registration_certificate_number =
      details.registration_certificate_number;
  if (details.first_registration_date !== null)
    values.first_registration_date = details.first_registration_date;
  if (details.engine_cc !== null) values.engine_cc = String(details.engine_cc);
  if (details.power_kw !== null)
    values.power_hp = String(Math.round(details.power_kw * 1.3596216173));
  if (details.fuel_type !== null) values.fuel_type = details.fuel_type;
  if (details.colour !== null) values.colour = details.colour;
  if (details.seats !== null) values.seats = String(details.seats);
  // Only map explicit Euro labels; document approval codes are ambiguous.
  const euro = details.environmental_class?.match(/^euro[\s_-]*([1-6])$/i);
  if (euro) values.euro_standard = `euro_${euro[1]}`;
  return values;
}
