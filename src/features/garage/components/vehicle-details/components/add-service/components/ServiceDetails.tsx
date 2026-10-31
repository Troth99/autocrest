import type { VehicleServiceSectionProps } from "@/features/garage/types/add-service-form";


export default function ServiceDetails({
    register,
    values,
}: VehicleServiceSectionProps) {

    return (
        <>
            <h2 className="section-title">Service details</h2>

            <div className="grid items-start gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <label htmlFor="service-type" className="form-field-label">
                        Service type *
                    </label>
                    <select id="service-type" className="form-select" {...register("serviceType")}>
                        <option value="">Select service</option>
                        <option value="oil">Oil & filters</option>
                        <option value="brakes">Brakes</option>
                        <option value="tires">Tires & wheels</option>
                        <option value="battery">Battery</option>
                        <option value="timing">Engine timing belt / chain</option>
                        <option value="transmission">Transmission & clutch</option>
                        <option value="drivetrain">Drivetrain & differential</option>
                        <option value="suspension">Suspension & steering</option>
                        <option value="air-conditioning">Air conditioning</option>
                        <option value="cooling">Cooling system</option>
                        <option value="electrical">Electrical system</option>
                        <option value="engine">Engine repair</option>
                        <option value="exhaust">Exhaust system</option>
                        <option value="bodywork">Bodywork & accessories</option>
                        <option value="other">Other</option>
                    </select>
                    {values.serviceType === "other" && (
                        <div className="grid gap-2">
                            <label htmlFor="custom-service-type" className="form-field-label">
                                Specify service *
                            </label>
                            <input
                                data-slot="input"
                                id="custom-service-type"
                                type="text"
                                required
                                pattern={".*\\S.*"}
                                title="Enter a service description."
                                placeholder="Describe the service"
                                className="native-input"
                                {...register("customServiceType")}
                            />
                        </div>
                    )}
                </div>

                <div className="grid gap-2">
                    <label htmlFor="visit-reason" className="form-field-label" >
                        Reason for visit
                    </label>
                    <select id="visit-reason" className="form-select" {...register("visitReason")}>
                        <option value="">Select reason</option>
                        <option value="scheduled">Scheduled maintenance</option>
                        <option value="repair">Repair</option>
                        <option value="diagnostics">Diagnostics</option>
                        <option value="recall">Manufacturer recall</option>
                        <option value="other">Other</option>
                    </select>
                    {values.visitReason === "other" && (
                        <div className="grid gap-2">
                            <label htmlFor="custom-visit-reason" className="form-field-label">
                                Specify reason *
                            </label>
                            <input
                                data-slot="input"
                                id="custom-visit-reason"
                                type="text"
                                required
                                pattern={".*\\S.*"}
                                title="Enter a reason for the visit."
                                placeholder="Describe the reason for your visit"
                                className="native-input"
                                {...register("customVisitReason")}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <label htmlFor="service-date" className="form-field-label">
                        Date *
                    </label>
                    <input data-slot="input"
                        id="service-date"
                        type="date"
                        className="native-input"
                        {...register("serviceDate")}
                    />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="service-mileage" className="form-field-label">
                        Mileage (km) *
                    </label>
                    <input data-slot="input"
                        id="service-mileage"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="150000"
                        className="native-input"
                        {...register("mileage")}
                    />
                </div>
            </div>
            <div className="grid gap-2">
                <label htmlFor="service-provider" className="form-field-label">
                    Workshop / mechanic
                </label>
                <input data-slot="input"
                    id="service-provider"
                    type="text"
                    placeholder="Workshop name or DIY"
                    className="native-input"
                    {...register("provider")}
                />
            </div>

            <div className="grid gap-2">
                <label htmlFor="service-work" className="form-field-label">
                    Work performed
                </label>
                <textarea
                    id="service-work"
                    rows={3}
                    placeholder="Describe what was checked, repaired or replaced."
                    className="form-textarea"
                    {...register("workPerformed")}
                />
            </div>

        </>
    )
}
