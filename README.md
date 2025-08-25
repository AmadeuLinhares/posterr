# Posterr

I developed a modern social feed application where users can create posts, repost content, and interact with others in real time. The project was built with a strong focus on developer experience, performance, and scalability.

🔧 Configs
	• A function called injectMock was created to inject the necessary information to run the system. If you want to run thhe project from strach, please clean your local storage and reload the page.
	• packmanager: pnpm
	• Node version: v24.0.1

🚀 Start project
	• pnpm i
	• pnpm run dev

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


## Planning

### Topic 1

On the main feed, will there be any mention of this new feature? For example, today in the feed we have posts, quotes, and reposts made by the application’s users. Will we provide any indication that a post contains a direct mention in the general feed so that all users can see it, or will only the owner of the post be able to view the mentions? If the answer is no, will the user have the option to go to a follower’s profile and view the new tab of posts and replies?

Regarding the interface, today in regular posts we have two icons that indicate quotes and reposts. Will we add another one to indicate that there is a new type—in this case, a mention?

Will it be possible to edit or delete a mention after it has been created?

Can we follow the same structure of the card-post component to display mentions, or will we use a new approach?

### Topic 2

Today in the API, we have two attributes that indicate whether a post is a repost or a quote. If it is a repost, the parentId will be filled and isQuote will be null. To add mentions, we could create a new field called isMention. In this case, to create a mention about a post, the parentId (the ID of the original post) must be filled and isMention set to true.

On the frontend, we already have a structure using query params, so that the user can copy and paste the URL into another tab and remain on the same page. With that in place, we could simply add one more parameter to this query param structure—called isMention—and use it to control which type of post the user is creating in the CreatePost component.

This brings us to the next question: how will we expose this functionality to the user? Will we add a new “Mention” button alongside repost and quote, or should the user just start typing @... and see suggestions to choose from? In the second option, things get a little more complex because we’re not referring to a user (which has a user ID and can be easily searched), but to a post, which may contain up to 777 characters. From my personal point of view, I believe the button would be the ideal option, because on click we can capture the post ID, making it easier to call the API.

As for the display area of this new feature, creating a new tab will be a straightforward process, since this is already componentized in our app. For the request, we can filter posts where ownerId equals the logged-in user, parentId is set, and isMention is true. If we want, we can implement pagination using infiniteQuery (as we did on the feed screen).

The final question is: will the only place to view this type of post be the user’s profile page? If so, don’t you think we might be hiding this functionality a bit and preventing other users from interacting with our mentions?





## Critique

### Topic 1

The first thing I would implement would be the creation of unit tests and end-to-end tests. Since the project has some business rules—such as post type, a user not being allowed to make more than five posts per day, maximum characters per post, maximum characters in the username—I believe setting up tests would be my first choice.

I would also set up pre-commit hooks with Husky to run unit tests, linting, Prettier, type-checking, depcheck, etc., in order to maintain consistency across the project.

In a real API scenario, I would use Axios + React Query (already in use in the project) to implement interceptors, middlewares, etc.

Finally, I would create a design system for our global components.

### Topic 2

If the project started to scale significantly, I believe the first bottleneck we would face would be the way the APIs were implemented and how they interact with each other. Today in the project, we fetch all posts and then filter them by those made by the user, by the users they follow, etc. This would never work in the real world, so the first step would be to develop a scalable backend for our project.

I would likely use Node.js + Fastify for building it, and even an ORM such as Prisma. I would follow principles such as SOLID and the Repository Pattern (Project example where i apply those concepts: https://github.com/AmadeuLinhares/shopping-cart). For the database, I believe I would use Postgres, as it is robust and can handle a massive amount of data.

On the web frontend, I would install a DOM virtualization library to handle the feed rendering, and continue using infiniteQuery to fetch the data.
