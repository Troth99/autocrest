# Reusable styles

Check existing classes before repeating a visual pattern. Keep spacing, grids,
responsive placement and one-off variations in the component's `className`.

| Pattern | Existing classes | Defined in |
| --- | --- | --- |
| Buttons | `button-base` with `button-primary`, `button-secondary`, `button-ghost` or `button-danger` | `src/shared/styles/utilities.css` |
| Panels | `section-card`, `content-card`, `panel-card`, `card-base` | `components.css` and `utilities.css` |
| Headings and descriptions | `section-title`, `section-description`, `field-description`, `detail-label`, `detail-value` | `components.css` and `utilities.css` |
| Forms | `form-field`, `form-field-label`, `form-input`, `native-input`, `form-select`, `form-textarea` | `components.css` and `utilities.css` |
| Dialog placement | `modal-position` | `src/shared/styles/components.css` |
| Service field groups | `service-detail-group` | `src/features/garage/styles/components.css` |

`field-description` is small supporting text; `section-description` is the larger
section introduction. They intentionally have different font sizes and line heights.
The input classes also have different sizes and focus styles; choose the class used
by the surrounding form rather than treating them as interchangeable.

`modal-position` only centers the popup. Keep viewport width, maximum width,
scrolling, surface colors and animations at each dialog's call site. In particular,
keep `w-[calc(100%-2rem)]` explicit when combining with `card-base`, which sets
`w-full`: Tailwind's utility order must let the viewport width override that default.

Use shared CSS for patterns used across features. Keep domain-specific patterns in
that feature's `styles/components.css`. Tailwind v4 `@utility` is appropriate when a
class must also work inside `@apply`; ordinary component rules can stay in
`@layer components`.

## File ownership

- `src/app/globals.css`: ordered imports, Tailwind dark variant, base layer and final overrides. Keep the import order to preserve the cascade.
- `tokens.css`: dark/light theme variables, theme overrides and Tailwind token mapping.
- `base.css`: body background, text color and font.
- `controls.css`: shared select cursor and input token rules.
- `utilities.css`: existing shared buttons, cards, labels and form utilities.
- `components.css`: existing shared component patterns.
- `src/features/garage/styles/forms.css`: vehicle form field overrides.
- `src/features/garage/styles/vehicle-card.css`: vehicle card appearance and animations.
- `src/features/auth/styles/oauth.css`: OAuth button appearance and motion.

The final auth form card and vehicle card pseudo-element overrides stay in
`globals.css` to retain their original position after the base layer.
