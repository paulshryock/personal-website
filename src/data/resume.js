/**
 * Resume data.
 *
 * @type  {{
 *   education: {
 *     courses?: string[]
 *     degree: string
 *     description?: string
 *     duration: { from: string, to: string }
 *     field: string
 *     school: string
 *     url: string
 *   }[]
 *   experience: {
 *     accomplishments?: string[]
 *     description?: string
 *     duration: { from: string, to: string }
 *     employer: string
 *     link?: string
 *     role: string
 *   }[]
 *   skills: {
 *     type: string
 *     tools: string[]
 *   }[]
 * }}
 * @since unreleased
 */
export default {
	education: [
		{
			courses: [
				'TypeScript Basics',
				'Everyday TypeScript',
				'Advanced TypeScript',
				'Regular Expressions',
				'JavaScript Arrays',
			],
			degree: 'Online learning platform',
			description: `Execute Program is a dynamic, highly interactive learning system. Lessons mix short explanations with real code examples running live in the browser. Each course has hundreds of code examples, so by the end you've worked with a lot of real code. Each lesson is built on concepts from earlier lessons, with follow-up reviews to reinforce what you've learned`,
			duration: { from: '2021', to: '2022' },
			field: 'Software Engineering with a focus on TypeScript',
			school: 'Execute Program',
			url: 'https://www.executeprogram.com/',
		},
		{
			degree: 'Online learning platform',
			description: `An online lecture course by Scott Jehl. Learn to analyze site performance, fix issues, monitor for regressions, and deliver fast, responsive designs from the start.`,
			duration: { from: '2021', to: '2021' },
			field: 'Web Performance',
			school: 'Lightning-Fast Web Performance',
			url: 'https://scottjehl.com/lfwp/',
		},
		{
			courses: [
				'Introduction to Docker',
				'Getting Started with Docker on Linux for AWS',
				'Managing Applications with Docker Compose',
				'Using Amazon ECS for Blue-Green Deployments',
				'Final Exam: Docker in Depth',
			],
			degree: 'Certificate',
			description: `This learning path is designed to teach you all about Docker starting from the humble individual container and progressing to the continuous deployment of an application in AWS. In the first course, the fundamentals of using Docker containers are taught. You'll reinforce your learning in the first Lab on Docker basics. In the second course, you learn how to manage multi-container applications using Docker Compose. In the final course, you see how to deploy container applications to a cluster by running Docker in swarm mode. You round out what you've learned by performing blue-green deployments of an application using Docker containers in Amazon's EC2 Container Service. After completing this learning path you will have the skills needed to start using Docker to improve your development and operational efficiency.`,
			duration: { from: '2020', to: '2022' },
			field: 'Docker in Depth learning path',
			school: 'Cloud Academy',
			url: `https://cloudacademy.com/learning-paths/cloud-academy-docker-in-depth-129/`,
		},
		{
			courses: [
				'All about Node module system',
				'Use existing Node packages or publish your own',
				`Write asynchronous JavaScript code (promises and async/await)`,
				'Implement CRUD operations',
				'Store complex, relational data in MongoDB using Mongoose',
				'Implement data validation',
				'Implement authentication and authorization',
				'Handle and log errors effectively',
				`Set up configuration for various environments (dev, test, prod)`,
				'Write unit and integration tests',
				'Build features using test-driven development',
				'Deploy your Node apps to Heroku',
			],
			degree: 'Online learning platform',
			description: `Learn to build highly-scalable, fast and secure RESTful APIs with Node, Express, and MongoDB.`,
			duration: { from: '2019', to: '2019' },
			field: 'Full Stack Web Development',
			school: 'The Complete Node.js Course',
			url: `https://codewithmosh.com/p/the-complete-node-js-course`,
		},
		{
			degree: 'Online learning platform',
			description: `Master the SQL statements that every software developer needs for designing, developing and maintaining databases. By the end of the course, be able to tackle the most complex SQL projects with relative ease and not feel confused by any SQL concepts.`,
			duration: { from: '2019', to: '2019' },
			field: 'Data Science, Full Stack Web Development',
			school: 'Complete SQL Mastery',
			url: `https://codewithmosh.com/p/complete-sql-mastery`,
		},
		{
			courses: [
				'JavaScript Basics',
				'JavaScript Deeply',
				'The WordPress REST API',
			],
			degree: 'Master Course Cohort Program',
			description: `Learn JavaScript properly from the ground up: Syntax, the DOM, Events, ESNext and much more. Learn to use and customize the WordPress REST API with themes, plugins and decoupled apps. Learn how to use popular frameworks like React and Vue within WordPress or in decoupled apps. Learn from JavaScript and WordPress API projects built by the pros.`,
			duration: { from: '2016', to: '2019' },
			field: 'Front End Web Development',
			school: 'JavaScript for WordPress',
			url: `https://javascriptforwp.com/`,
		},
		{
			courses: [
				'Introduction to Command Line Power User',
				'Command Line Basics',
				'Installing iTerm or Cygwin',
				'Installing ZSH0',
				'Custom Terminal Colours',
				'Custom ZSH Themes & Prompts',
				'Discovering ZSH Features',
				'Advanced History with ZSH',
				'Getting the most out of ZSH with Plugins',
				'Using z to jump to frecent folders',
				'Better deletion of files & folders with trash',
			],
			degree: 'Online learning platform',
			description: `A video series for web developers on learning a modern command line workflow with ZSH, Z and related tools.`,
			duration: { from: '2018', to: '2018' },
			field: 'Full Stack Web Development',
			school: 'Command Line Power User',
			url: 'https://commandlinepoweruser.com/',
		},
		{
			courses: ['Project Management Foundations'],
			degree: 'Online learning platform',
			duration: { from: '2017', to: '2017' },
			field: 'Project Management',
			school: 'LinkedIn Learning',
			url: 'https://www.linkedin.com/learning/',
		},
		{
			courses: [
				'HTML',
				'HTML forms',
				'HTML email design',
				'CSS basics',
				'jQuery basics',
				'How to make a website',
				'WordPress Development',
				'PHP for WordPress',
				'Local WordPress development',
				'WordPress theme development',
				'SEO basics',
				'SEO for WordPress',
				'Introduction to front end performance optimization',
				'Hosting a website with GitHub pages',
				'How to freelance',
			],
			degree: 'Online learning platform',
			description: `Learn from over 1000 videos created by expert teachers on web design, coding, business, and much more. Our library is continually refreshed with the latest on web technology so you'll never fall behind. Practice what you've learned through quizzes and interactive Code Challenges. This style of practicing will allow you to retain information you've learned so you can apply it to your own future projects.`,
			duration: { from: '2013', to: '2016' },
			field: 'Front End Development, WordPress, SEO, Business',
			school: 'Treehouse',
			url: 'https://teamtreehouse.com/',
		},
		{
			courses: [
				'2D Design',
				'3D Design',
				'Color & Design',
				'Drawing I',
				'Drawing II',
				'History of Graphic Design',
				'Graphic Design I',
				'Graphic Design II',
				'Computer Illustration',
				'Digital Imaging',
				'Page Layout',
				'Portfolio Seminar',
			],
			degree: 'Associate of Fine Arts with High Honors',
			description: `The Associate of Fine Art degree program in graphic design teaches students how to develop design concepts and aesthetically arrange type and image in order to plan and produce intelligent visual communication solutions to client problems or self-authored work. Visual communication skills are developed within the constraints of time, budget, and technology. These solutions may include a variety of print based and digital media materials.`,
			duration: { from: '2008', to: '2010' },
			field: 'Graphic Design',
			school: 'Delaware County Community College',
			url: 'https://www.dccc.edu/',
		},
	],
	experience: [
		{
			accomplishments: [
				`Helped build and maintain the editorial CMS environment powering NBA.com`,
				`Developed the front end interface for NBA Watch Party, a watch-together app`,
				`Building the next generation WNBA headless CMS experience`,
			],
			description: `Engineers and maintains over 130 WordPress websites for affiliated leagues, teams, and microsites. Ensures great editorial user experiences and improves public-facing user interfaces. Follows modern best practices for improving accessibility, security, performance, and UX across all digital products.`,
			duration: { from: '2020', to: 'present' },
			employer: 'NBA',
			link: 'https://www.nba.com/',
			role: 'Senior Software Engineer',
		},
		{
			accomplishments: [
				`Designed and engineered several new landing pages and content templates`,
				`Rebuilt development build pipeline, replacing Grunt with Gulp and other modern tools`,
			],
			description: `Develops and maintains marketing website and microsites, ensuring rich editorial CMS workflows and smooth web experiences. Contributes high-quality code and supports new features with minimal direction.`,
			duration: { from: '2018', to: '2023' },
			employer: 'Palantir',
			link: 'https://www.palantir.com/',
			role: 'Web Developer',
		},
		{
			accomplishments: [
				`Engineered 2018 conference ecommerce platform generating $2M in sales`,
				`Built internal application for sending employee communications at scale (80k recipients)`,
				`Developed fair housing pledge website and admin dashboard with CSV exports (17k users)`,
				`Built fast, secure web application to collect conference attendee information in a database`,
			],
			description: `Engineered and maintained many accessible websites, applications, and HTML emails for world-class real estate brands. Proposed and executed effective software and marketing solutions, providing high ROI for internal clients.`,
			duration: { from: '2017', to: '2020' },
			employer: 'Realogy',
			link: 'https://www.realogy.com/',
			role: 'Lead Front End Developer',
		},
		{
			duration: { from: '2016', to: '2017' },
			employer: 'Ogilvy Health',
			role: 'Interactive Art Director',
		},
		{
			duration: { from: '2016', to: '2017' },
			employer: 'McCann Echo',
			role: 'Graphic Designer',
		},
		{
			duration: { from: '2015', to: '2016' },
			employer: 'OSG Billing Services',
			role: 'Graphic Designer, Web Developer',
		},
		{
			duration: { from: '2014', to: '2015' },
			employer: 'Kaast Machine Tools',
			role: 'Web Designer, Web Developer',
		},
		{
			duration: { from: '2013', to: '2014' },
			employer: 'Sports Reports Press',
			role: 'Graphic Designer',
		},
		{
			duration: { from: '2012', to: '2014' },
			employer: 'Spirit Media Group',
			role: 'Graphic Designer',
		},
		{
			duration: { from: '2013', to: '2013' },
			employer: 'Barksdale Portraits',
			role: 'Imaging Artist',
		},
		{
			duration: { from: '2011', to: '2013' },
			employer: 'Folsom Tool',
			role: 'Machine Operator, Web Designer',
		},
		{
			duration: { from: '2010', to: '2013' },
			employer: 'The Vine',
			role: 'Graphic Designer',
		},
		{
			duration: { from: '2011', to: '2011' },
			employer: 'The Communitarian',
			role: 'Graphic Designer, Web Developer',
		},
		{
			duration: { from: '2009', to: 'present' },
			employer: 'Freelance',
			role: 'Software Engineer, Web Designer',
		},
	],
	skills: [
		{
			tools: ['Eleventy', 'Liquid', 'Web Components'],
			type: 'HTML',
		},
		{
			tools: ['Sass', 'PostCSS', 'BEM', 'ITCSS'],
			type: 'CSS',
		},
		{
			tools: [
				'TypeScript',
				'Node.js',
				'ES Modules',
				'Jest',
				'ESLint',
				'Prettier',
				'Express',
				'Next.js',
				'React',
				'Angular',
			],
			type: 'JavaScript',
		},
		{
			tools: [
				'WordPress',
				'Composer',
				'Pest',
				'Brain Monkey',
				'PHPCS',
				'Rector',
			],
			type: 'PHP',
		},
		{
			tools: ['PostgreSQL', 'MySQL', 'MongoDB'],
			type: 'SQL, NoSQL',
		},
		{
			tools: [
				'Docker',
				'Docker Compose',
				'GitHub Actions',
				'BitBucket Pipelines',
				'Netlify',
				'Vercel',
				'Heroku',
			],
			type: 'CI/CD',
		},
		{
			tools: [
				'HTTP',
				'Postman',
				'REST APIs',
				'JSON',
				'Markdown',
				'YAML',
				'TOML',
				'esbuild',
				'swc',
				'webpack',
				'babel',
				'Storybook',
				'nx',
				'oclif',
				'Git',
				'bash',
				'zsh',
			],
			type: 'Other',
		},
	],
}
