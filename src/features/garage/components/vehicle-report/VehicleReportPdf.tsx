import {
    Document,
    Font,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";
import type { Vehicle } from "@/features/garage/types/vehicle";

// Bundle the fonts locally so Cyrillic plates and notes render without external requests.
Font.register({
    family: "Noto Sans",
    fonts: [
        { src: "/fonts/noto-sans/NotoSans-Regular.ttf", fontWeight: 400 },
        { src: "/fonts/noto-sans/NotoSans-Bold.ttf", fontWeight: 700 },
    ],
});

// PDF elements use React PDF styles rather than HTML or Tailwind classes.
// Numeric dimensions such as padding and font size are measured in points.
const styles = StyleSheet.create({
    page: {
        padding: 36,
        fontSize: 10,
        fontFamily: "Noto Sans",
        lineHeight: 1.4,
        color: "#111827",
    },
    brand: {
        fontSize: 10,
        color: "#6b7280",
        marginBottom: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: 700,
        // Override the inherited line height for this larger text.
        lineHeight: 1.3,
        marginBottom: 10,
    },
    header: { borderBottomWidth: 1, borderBottomColor: "#d1d5db", paddingBottom: 14, marginBottom: 18 },
    nickname: { fontSize: 10, lineHeight: 1.5, color: "#6b7280" },
    heading: { fontSize: 13, lineHeight: 1.4, fontWeight: 700, marginBottom: 10, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
    section: { marginBottom: 12 },
    grid: { flexDirection: "row", flexWrap: "wrap" },
    row: {
        width: "50%",
        paddingRight: 14,
        paddingBottom: 12,
    },
    label: {
        color: "#6b7280",
        marginBottom: 2,
    },
    notes: { marginTop: 10 },
    footer: { marginTop: 22, borderTopWidth: 1, borderTopColor: "#d1d5db", paddingTop: 10, fontSize: 8, color: "#6b7280" },
});

export default function VehicleReportPdf({
    vehicle,
}: {
    vehicle: Vehicle;
}) {


    return (
        // Document defines the PDF file; its title is stored in the PDF metadata.
        <Document title={`${vehicle.make} ${vehicle.model} - Vehicle report`}>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.brand}>AutoCrest · Vehicle report</Text>
                    <Text style={styles.title}>
                        {vehicle.make} {vehicle.model}
                    </Text>
                    {vehicle.nickname && <Text style={styles.nickname}>{vehicle.nickname}</Text>}
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading} minPresenceAhead={48}>Vehicle identity</Text>
                    <View style={styles.grid}>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Registration plate</Text>
                            <Text>{vehicle.plate ?? "Not provided"}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>VIN</Text>
                            <Text>{vehicle.vin ?? "Not provided"}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Manufacture year</Text>
                            <Text>{String(vehicle.manufacture_year ?? "Not provided")}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Vehicle type</Text>
                            <Text>{vehicle.vehicle_type}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Trim</Text>
                            <Text>{vehicle.trim ?? "Not provided"}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Colour</Text>
                            <Text>{vehicle.colour ?? "Not provided"}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Seats</Text>
                            <Text>{String(vehicle.seats ?? "Not provided")}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading} minPresenceAhead={48}>Technical specifications</Text>
                    <View style={styles.grid}>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Fuel type</Text>
                            <Text>{vehicle.fuel_type?.replaceAll("_", " ") ?? "Not provided"}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Transmission</Text>
                            <Text>{vehicle.transmission?.replaceAll("_", " ") ?? "Not provided"}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Drivetrain</Text>
                            <Text>{vehicle.drivetrain?.toUpperCase() ?? "Not provided"}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Engine capacity</Text>
                            <Text>{vehicle.engine_cc != null ? `${vehicle.engine_cc} cc` : "Not provided"}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Power</Text>
                            <Text>{vehicle.power_hp != null ? `${vehicle.power_hp} hp` : "Not provided"}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Emissions standard</Text>
                            <Text>{vehicle.euro_standard?.replaceAll("_", " ").toUpperCase() ?? "Not provided"}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading} minPresenceAhead={48}>Registration and purchase</Text>
                    <View style={styles.grid}>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>First registration</Text>
                            <Text>{vehicle.first_registration_date ?? "Not provided"}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Registration country</Text>
                            <Text>{vehicle.registration_country_code ?? "Not provided"}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Registration certificate number</Text>
                            <Text>{vehicle.registration_certificate_number ?? "Not provided"}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Purchase date</Text>
                            <Text>{vehicle.purchase_date ?? "Not provided"}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Purchase price</Text>
                            <Text>{vehicle.purchase_price != null
                                ? `${vehicle.purchase_price.toLocaleString("en-GB")} ${vehicle.purchase_currency_code ?? ""}`.trim()
                                : "Not provided"}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Vehicle use</Text>
                            <Text>{vehicle.vehicle_use ?? "Not provided"}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading} minPresenceAhead={48}>Mileage</Text>
                    <View style={styles.grid}>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Current odometer reading</Text>
                            <Text>{`${vehicle.mileage_km.toLocaleString("en-GB")} km`}</Text>
                        </View>
                        <View style={styles.row} wrap={false}>
                            <Text style={styles.label}>Mileage recorded on</Text>
                            <Text>{vehicle.mileage_recorded_at?.slice(0, 10) ?? "Not provided"}</Text>
                        </View>
                    </View>
                </View>
                {vehicle.description && (
                    <View style={styles.notes}>
                        <Text style={styles.heading} minPresenceAhead={24}>Notes</Text>
                        <Text>{vehicle.description}</Text>
                    </View>
                )}
                <Text style={styles.footer}>
                    This report contains information recorded in AutoCrest by the vehicle owner.
                </Text>
            </Page>
        </Document>
    );
}
