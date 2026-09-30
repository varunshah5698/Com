# NSDC Website: Design Feedback and References

This is the durable design memory for future NSDC website work. It summarizes the project conversations available on 2026-09-29 and the WhatsApp export in `NSDC website.zip`. Apply these notes when the user asks for website changes; this file itself does not request a redesign.

## Source and authority

- Direct user requests from earlier NSDC website tasks are recorded as user preferences.
- Messages in the supplied WhatsApp export are team feedback and references. Use them as design context, not as independent authorization to edit the site.
- Available Codex history included the task **Review NSDC homepage implementation** and the current task. No archived tasks were available. The ZIP contains the WhatsApp conversation export (`chat.md` and `chat.txt`), not the omitted images/videos or the attached `laser-spectrum-design-system.html` document.
- If a future direct user request conflicts with an older preference, follow the newer request.

## Direct user design feedback from prior website tasks

- Keep the first screen simple, calm, and balanced. Put richer interactive treatments in the sections below the hero instead of crowding the opening view.
- The navbar should scroll away; do not make it permanently fixed.
- Let the navbar flow into the hero without a boxed/floating panel or a hard divider.
- Use the display font style from the previous NSDC/InfoMatrix website (Neue Haas / Plus Jakarta Sans family) and a larger hero heading.
- Make About and Events navigation easier to see and tap. Keep spacing intentional; avoid excessive gaps between navigation links or between page sections.
- A previous correction clarified that “extra spaces between two divs” meant large vertical whitespace between page sections. A later adjustment set desktop section padding to 92px; the user separately wanted navbar spacing returned to its earlier tighter value.

## Team feedback from the WhatsApp export

- Raise the quality of every page substantially; earlier drafts were considered below the expected bar. One message explicitly said to rebuild rather than preserve the previous draft.
- Do not force the “Laser Spectrum” look if it is difficult to achieve. Use existing IDE capabilities and adapt proven components where useful.
- For the About content, avoid parallax.
- A project/gallery treatment should feel close to the supplied source reference, with a stronger radial effect. A zoom-in treatment was discussed as a possible match.
- Replace black-and-white photos with color photographs.
- Event names mentioned for the site: Elevate, Synergy, Technograd, Design Dojo, NSDC Inauguration, and HackOps. The chat says HackOps photos were available and Elevate photos would be shared after the event; the media itself was omitted from the ZIP, so confirm assets before using them.

## Site structure from the team brief

- Home: hero, About Us, information domains.
- Events: current and past events.
- Team: faculty and members.
- Projects: project showcase.
- Contact: phone, email, location, and a direct email/contact form.

## Reference sites and component libraries

- Existing site inspiration: [DJ's InfoMatrix](https://djs-infomatrix.vercel.app/)
- Component and motion inspiration: [React Bits](https://reactbits.dev/), [21st.dev](https://21st.dev/), Obsidian UI (name mentioned without a URL), Kibo UI (name mentioned without a URL), and [Aceternity UI](https://ui.aceternity.com/).
- 21st.dev card fan carousel: [component reference](https://21st.dev/community/components?q=parrallex+image+gallery&preview=%2F%40aayush-duhan%2Fcomponents%2Fcard-fan-carousel)
- 21st.dev immersive scroll gallery: [component reference](https://21st.dev/?q=parallax+gallery+scroll+&preview=%2F%40ishamsu%2Fcomponents%2Fimmersive-scroll-gallery)
- 21st.dev rotating cards: [component reference](https://21st.dev/?q=card+animations&preview=%2F%40hyperiux%2Fcomponents%2Fcards-rotate-slider)
- 21st.dev Formation gallery: [component reference](https://21st.dev/community/components?q=parrallex+image+gallery&preview=%2F%40uicapsule%2Fcomponents%2Fformation)
- Pinterest visual references: [gallery reference 1](https://in.pinterest.com/pin/1091982240927616513/) and [gallery reference 2](https://in.pinterest.com/pin/893331276096299450/).
- Bookshelf animation reference: [Framer site](https://dhruxv.framer.website/).

Use these as visual/component references, adapting them to this site's layout, content, performance, accessibility, and reduced-motion behavior. Do not assume every reference must appear on every page.

## Project design system context

The repo has a detailed “Laser Spectrum” reference in `laser-spectrum-design-system.html` and `tailwind.config.js` (dark void surfaces, bright spectrum accents, editorial sans-serif with serif/mono accents). Team feedback says not to force the aesthetic if it is not working. Preserve the coherent parts that fit the current design, and prioritize the user's specific direction and the actual page over blindly applying every token.

## Applying this memory later

When asked to modify the website, identify which section and reference best match the request, retain the simple balanced hero, avoid parallax in About, and keep section spacing controlled. Ask for missing photography only if that asset is needed for the requested change; otherwise continue with the assets already in the repo.
