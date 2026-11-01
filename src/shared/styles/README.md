# Reusable styles

Check existing classes before repeating a visual pattern. Keep spacing, grids,
responsive placement and one-off variations in the component's `className`.

| Pattern | Existing classes | Defined in |
| --- | --- | --- |
| Buttons | `button-base` with `button-primary`, `button-secondary`, `button-ghost` or `button-danger` | `src/app/globals.css` |
| Panels | `section-card`, `content-card`, `panel-card`, `card-base` | shared CSS and globals |
| Headings and descriptions | `section-title`, `section-description`, `field-description`, `detail-label`, `detail-value` | shared CSS and globals |
| Forms | `form-field`, `form-field-label`, `form-input`, `native-input`, `form-select`, `form-textarea` | shared CSS and globals |
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
