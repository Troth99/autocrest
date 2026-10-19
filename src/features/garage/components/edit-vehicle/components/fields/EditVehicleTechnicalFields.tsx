import { Input } from "@/shared/components/ui/input";
import type { Vehicle } from "@/features/garage/types/vehicle";

type Props = {
    vehicle: Vehicle;
};

export default function EditVehicleTechnicalFields({ vehicle }: Props) {
    return (
        <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
            <legend className="sr-only">Technical specifications</legend>
            <h2 className="section-title">Technical specifications</h2>
            <p className="mt-1 text-sm text-muted">Engine, drivetrain and appearance. Leave unknown details blank.</p>
            <div className="mt-4 grid items-start gap-4 sm:grid-cols-2">
                <label htmlFor="fuel_type" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Fuel type</span>
                    <select id="fuel_type" name="fuel_type" defaultValue={vehicle.fuel_type ?? ""} className="form-select">
                        <option value="" className="bg-panel text-text-primary">Not specified</option>
                        <option value="petrol" className="bg-panel text-text-primary">Petrol</option>
                        <option value="diesel" className="bg-panel text-text-primary">Diesel</option>
                        <option value="electric" className="bg-panel text-text-primary">Electric</option>
                        <option value="hybrid" className="bg-panel text-text-primary">Hybrid</option>
                        <option value="plug_in_hybrid" className="bg-panel text-text-primary">Plug-in hybrid</option>
                        <option value="lpg" className="bg-panel text-text-primary">LPG</option>
                        <option value="cng" className="bg-panel text-text-primary">CNG</option>
                        <option value="other" className="bg-panel text-text-primary">Other</option>
                    </select>
                </label>
                <label htmlFor="transmission" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Transmission</span>
                    <select id="transmission" name="transmission" defaultValue={vehicle.transmission ?? ""} className="form-select">
                        <option value="" className="bg-panel text-text-primary">Not specified</option>
                        <option value="manual" className="bg-panel text-text-primary">Manual</option>
                        <option value="automatic" className="bg-panel text-text-primary">Automatic</option>
                        <option value="semi_automatic" className="bg-panel text-text-primary">Semi-automatic</option>
                    </select>
                </label>
                <label htmlFor="drivetrain" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Drivetrain</span>
                    <select id="drivetrain" name="drivetrain" defaultValue={vehicle.drivetrain ?? ""} className="form-select">
                        <option value="" className="bg-panel text-text-primary">Not specified</option>
                        <option value="fwd" className="bg-panel text-text-primary">FWD</option>
                        <option value="rwd" className="bg-panel text-text-primary">RWD</option>
                        <option value="awd" className="bg-panel text-text-primary">AWD</option>
                        <option value="4wd" className="bg-panel text-text-primary">4WD</option>
                    </select>
                </label>
                <label htmlFor="engine_cc" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Engine capacity (cc)</span>
                    <Input
                        id="engine_cc"
                        name="engine_cc"
                        defaultValue={vehicle.engine_cc ?? ""}
                        type="number"
                        min={1}
                        step={1}
                    />
                </label>
                <label htmlFor="power_hp" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Power (hp)</span>
                    <Input
                        id="power_hp"
                        name="power_hp"
                        defaultValue={vehicle.power_hp ?? ""}
                        type="number"
                        min={1}
                        step={1}
                    />
                </label>
                <label htmlFor="euro_standard" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Emissions standard</span>
                    <select id="euro_standard" name="euro_standard" defaultValue={vehicle.euro_standard ?? ""} className="form-select">
                        <option value="" className="bg-panel text-text-primary">Not specified</option>
                        <option value="euro_1" className="bg-panel text-text-primary">Euro 1</option>
                        <option value="euro_2" className="bg-panel text-text-primary">Euro 2</option>
                        <option value="euro_3" className="bg-panel text-text-primary">Euro 3</option>
                        <option value="euro_4" className="bg-panel text-text-primary">Euro 4</option>
                        <option value="euro_5" className="bg-panel text-text-primary">Euro 5</option>
                        <option value="euro_6" className="bg-panel text-text-primary">Euro 6</option>
                    </select>
                </label>
                <label htmlFor="colour" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Colour</span>
                    <Input
                        id="colour"
                        name="colour"
                        defaultValue={vehicle.colour ?? ""}
                    />
                </label>
                <label htmlFor="seats" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Seats</span>
                    <Input
                        id="seats"
                        name="seats"
                        defaultValue={vehicle.seats ?? ""}
                        type="number"
                        min={1}
                        step={1}
                    />
                </label>
            </div>
        </fieldset>
    );
}
