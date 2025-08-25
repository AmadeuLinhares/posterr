# Posterr

I developed a modern social feed application where users can create posts, repost content, and interact with others in real time. The project was built with a strong focus on developer experience, performance, and scalability.

🔧 Tech Highlights
	•	React Query (TanStack Query) → for powerful server-state management, cache updates, infinite queries for feeds, and optimistic UI when following/unfollowing users.
	•	shadcn/ui → provided accessible, Radix-based UI primitives with full Tailwind customization (Drawer, Tabs, Avatar, Tooltip, etc.), allowing me to implement a consistent and theme-aware design system.
	•	Zod + React Hook Form → schema-based form validation with type inference, ensuring robust input validation and clean error handling.
	•	TypeScript → strong typing across API schemas, queries, and components for safer, maintainable code.
	•	Date-fns → used for date formatting and utilities (e.g., “March 25, 2021” display, “isToday” checks).
	•	Custom API Simulation (fakeApiFetch, fakeApiSave) → mimicked backend requests with delays, enabling realistic optimistic updates and cache synchronization during development.

✨ Features
	•	Infinite scroll feed with react-intersection-observer.
	•	Post creation via a Drawer component with conditional validation (e.g., content required only for quotes/regular posts).
	•	Optimistic follow/unfollow with instant UI feedback and rollback on failure.
	•	Query param–driven UI state (e.g., opening drawer with ?isQuote=true).
	•	Responsive, accessible design powered by Tailwind and shadcn components.
