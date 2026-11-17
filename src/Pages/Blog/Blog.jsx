import { Helmet } from "react-helmet";

const Blog = () => {
  const blogUrl = "https://akmazhar2475.hashnode.dev/";

  const blogPosts = [
    {
      id: 1,
      number: "01",
      category: "JavaScript Fundamentals",
      title: "What is One-Way Data Binding?",
      image: "https://i.ibb.co/yf1jSkP/Screenshot-2023-11-07-192756.png",
      description:
        "One-way data binding is a data binding technique where data flows in one direction, typically from the model to the view. Changes in the model automatically reflect in the view, but changes in the view do not affect the model. It is commonly used in frameworks like AngularJS.",
    },
    {
      id: 2,
      number: "02",
      category: "Node.js & Backend",
      title: "What is NPM in Node.js?",
      image: "https://i.ibb.co/xzrxXqt/Node-JS-Npm-01-1.png",
      description:
        "NPM (Node Package Manager) is a package manager for Node.js that allows developers to easily install, share, and distribute packages or modules of reusable JavaScript code. It simplifies the process of incorporating various functionalities and libraries into a Node.js project.",
    },
    {
      id: 3,
      number: "03",
      category: "Database & Technology",
      title: "MongoDB Database vs MySQL Database",
      image: "https://i.ibb.co/wQMn0W0/mongodb-vs-mysql.jpg",
      description:
        "MongoDB and MySQL are popular database management systems with distinct differences. MongoDB is a NoSQL database with a flexible, JSON-like document model, while MySQL is a relational database that stores information in tables with rows and columns. They serve different application requirements, data structures, and scalability needs.",
      points: [
        "MongoDB is a NoSQL database, while MySQL is a relational database management system (RDBMS).",
        "MongoDB has a flexible schema, whereas MySQL generally uses a predefined schema.",
        "MongoDB uses a JSON-like document model, while MySQL organizes data into tables with rows and columns.",
        "MongoDB is often suitable for flexible and hierarchical data structures, while MySQL is widely used for structured data and relational transactions.",
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Abrar's Dine | Blog</title>
        <meta
          name="description"
          content="Explore technical articles about JavaScript, Node.js, NPM, MongoDB and MySQL."
        />
      </Helmet>

      <main className="min-h-screen overflow-hidden bg-[#F5F1E8]">
        {/* ================================
            PREMIUM BLOG HERO
        ================================= */}

        <section className="relative flex min-h-[440px] items-center justify-center overflow-hidden bg-[#142D22] px-5 py-20 sm:min-h-[500px] lg:min-h-[550px]">
          {/* Background Decorations */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(181,138,66,0.20),transparent_35%)]" />

          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#E8C77D]/15" />
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-[#E8C77D]/15" />

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-transparent via-[#B58A42] to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#E8C77D]/30 bg-white/5 px-5 py-2.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E8C77D]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#E8C77D] sm:text-[10px]">
                  Ideas · Technology · Knowledge
                </span>
              </div>

              <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Explore My
                <span className="mt-2 block italic font-medium text-[#E8C77D]">
                  Tech Journal.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-xs leading-7 text-white/75 sm:text-sm sm:leading-8 lg:mx-0">
                A space where I share technical knowledge, explore modern web
                technologies, and document my continuous learning journey in web
                development.
              </p>

              <div className="my-7 flex items-center justify-center gap-3 lg:justify-start">
                <span className="h-px w-10 bg-[#B58A42]" />
                <span className="h-1.5 w-1.5 rotate-45 bg-[#E8C77D]" />
                <span className="h-px w-10 bg-[#B58A42]" />
              </div>

              <a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-5 rounded-full bg-gradient-to-r from-[#B58A42] to-[#D0A85F] px-7 py-3.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:text-xs"
              >
                Visit My Hashnode Blog
                <span className="text-lg" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>

            {/* Hero Visual */}
            <div className="relative mx-auto w-full max-w-[390px]">
              <div className="relative overflow-hidden rounded-2xl border border-[#E8C77D]/30 bg-white/[0.07] p-7 shadow-2xl backdrop-blur-md sm:p-10">
                <div className="flex items-center justify-between border-b border-white/15 pb-6">
                  <img
                    src="https://i.ibb.co/6HZfd8R/bloglogo.png"
                    alt="Blog logo"
                    className="h-14 w-14 rounded-full border border-[#E8C77D]/40 bg-white object-cover p-1"
                  />

                  <span className="text-[9px] font-bold tracking-[0.2em] text-[#E8C77D]">
                    MY KNOWLEDGE SPACE
                  </span>
                </div>

                <div className="py-8">
                  <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">
                    THINK · CREATE · SHARE
                  </p>

                  <h2 className="font-serif text-5xl font-bold leading-tight text-white sm:text-6xl">
                    Learn.
                  </h2>

                  <h2 className="font-serif text-5xl font-bold italic leading-tight text-[#E8C77D] sm:text-6xl">
                    Build.
                  </h2>

                  <h2 className="font-serif text-5xl font-bold leading-tight text-white sm:text-6xl">
                    Grow.
                  </h2>
                </div>

                <div className="flex items-center justify-between border-t border-white/15 pt-5">
                  <span className="text-[9px] font-bold tracking-[0.15em] text-white/60">
                    WEB DEVELOPMENT
                  </span>

                  <span className="text-[9px] font-bold tracking-[0.15em] text-[#E8C77D]">
                    2026
                  </span>
                </div>
              </div>

              <div className="absolute -right-3 top-12 h-4 w-4 rounded-full bg-[#D0A85F] shadow-[0_0_25px_rgba(208,168,95,0.6)] sm:-right-5" />

              <div className="absolute -bottom-4 -left-3 h-8 w-8 rounded-full border border-[#B58A42]/60 sm:-left-5" />
            </div>
          </div>
        </section>

        {/* ================================
            FEATURED ARTICLES
        ================================= */}

        <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-7 sm:py-20 lg:px-12 lg:py-24">
          {/* Section Heading */}
          <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-[2px] w-7 bg-[#B58A42]" />

                <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#947039]">
                  Technical Knowledge
                </span>
              </div>

              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#24382E] sm:text-4xl lg:text-5xl">
                Featured
                <span className="ml-2 italic font-medium text-[#174C3A]">
                  Articles.
                </span>
              </h2>

              <p className="mt-3 max-w-xl text-xs leading-7 text-[#7B877E] sm:text-sm">
                Insights, explanations, and practical knowledge from the world
                of web development and modern technologies.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[#B58A42]/30 bg-white px-5 py-3 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#174C3A] font-serif text-sm font-bold text-white">
                03
              </span>

              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#174C3A]">
                  Published Topics
                </p>
                <p className="text-[9px] text-[#9AA198]">
                  Explore my collection
                </p>
              </div>
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#174C3A]/10 bg-white shadow-[0_8px_30px_rgba(16,57,44,0.045)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(16,57,44,0.12)]"
              >
                {/* Article Image */}
                <a
                  href={blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read ${post.title}`}
                  className="relative block h-[220px] overflow-hidden bg-[#E9EEE8] sm:h-[250px]"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#10251B]/55 via-transparent to-transparent" />

                  <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-[#174C3A]/90 font-serif text-sm font-bold text-white backdrop-blur-md">
                    {post.number}
                  </span>

                  <span className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#B58A42] text-xl text-white transition duration-300 group-hover:rotate-45">
                    ↗
                  </span>
                </a>

                {/* Article Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#B58A42]" />

                    <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#947039]">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold leading-snug text-[#24382E] transition-colors duration-300 group-hover:text-[#947039] sm:text-2xl">
                    {post.title}
                  </h3>

                  <p className="mt-4 text-xs leading-7 text-[#7B877E] sm:text-[13px]">
                    {post.description}
                  </p>

                  {/* MongoDB vs MySQL Points */}
                  {post.points && (
                    <ol className="mt-4 space-y-3 border-t border-[#174C3A]/10 pt-4">
                      {post.points.map((point, index) => (
                        <li
                          key={index}
                          className="flex gap-3 text-xs leading-6 text-[#68766C]"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F5F1E8] font-bold text-[#947039]">
                            {index + 1}
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ol>
                  )}

                  <div className="mt-auto pt-7">
                    <a
                      href={blogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 border-b border-[#B58A42] pb-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#174C3A] transition-all duration-300 hover:gap-5 hover:text-[#947039]"
                    >
                      Read Article
                      <span className="text-base" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================================
            HASHNODE CTA
        ================================= */}

        <section className="relative mx-4 mb-16 overflow-hidden rounded-2xl bg-gradient-to-br from-[#10392C] to-[#205C45] px-6 py-14 text-center sm:mx-7 sm:mb-20 sm:px-10 sm:py-16 lg:mx-12">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-[#E8C77D]/15" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-[#E8C77D]/15" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-[#E8C77D] sm:text-[10px]">
              Knowledge Is Meant to Be Shared
            </span>

            <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
              Keep Learning.
              <span className="block italic text-[#E8C77D]">Keep Growing.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-xs leading-7 text-white/70 sm:text-sm sm:leading-8">
              Discover more technical articles, development insights, and
              learning experiences on my Hashnode publication.
            </p>

            <a
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-5 rounded-full border border-[#E8C77D] bg-[#B58A42] px-7 py-3.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-transparent hover:text-[#E8C77D] sm:text-xs"
            >
              Explore Hashnode
              <span className="text-lg" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </section>

        {/* Bottom Brand Message */}
        <section className="border-t border-[#B58A42]/20 bg-[#EEE9DD] px-5 py-10 text-center sm:py-12">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#947039]">
            The Journey of Continuous Learning
          </p>

          <h2 className="mt-4 font-serif text-2xl font-semibold italic text-[#174C3A] sm:text-3xl">
            Think. Learn. Create. Share.
          </h2>

          <p className="mt-3 text-[9px] font-semibold tracking-[0.2em] text-[#829087] sm:text-[10px]">
            ABRAR'S DINE — BLOG & TECHNOLOGY
          </p>
        </section>
      </main>
    </>
  );
};

export default Blog;
