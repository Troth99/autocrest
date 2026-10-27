export default function ServiceReplacedPart() {
    return (
        <fieldset className="space-y-4 rounded-xl border border-line p-4">
            <legend className="px-2 text-sm font-semibold">
                Replaced part
            </legend>

            <div className="grid gap-2">
                <label htmlFor="part-name" className="text-sm">
                    Part name
                </label>
                <input data-slot="input"
                    id="part-name"
                    type="text"
                    placeholder="e.g. Oil filter"
                    className="native-input"
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <label htmlFor="part-brand" className="text-sm">
                        Brand
                    </label>
                    <input data-slot="input"
                        id="part-brand"
                        type="text"
                        placeholder="Manufacturer"
                        className="native-input"
                    />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="part-number" className="text-sm">
                        Part number
                    </label>
                    <input data-slot="input"
                        id="part-number"
                        type="text"
                        placeholder="Catalogue number"
                        className="native-input"
                    />
                </div>
            </div>

            <div className="grid gap-2">
                <label htmlFor="part-quantity" className="text-sm">
                    Quantity
                </label>
                <input data-slot="input"
                    id="part-quantity"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="1"
                    className="native-input"
                />
            </div>
        </fieldset>
    );
}
