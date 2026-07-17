import Image from "next/image";

type GitHubEvent = {
  type: string;
  repo: {
    name: string;
  };
  payload?: {
    size?: number;
  };
  created_at: string;
};

type CurrentProject = {
  name: string;
  fullName: string;
  commits: number;
  lastActive: string;
  description: string | null;
};

const githubHeaders = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2026-03-10",
  "User-Agent": "aunncodes-portfolio",
};

async function getCurrentProjects(): Promise<CurrentProject[]> {
  try {
    const response = await fetch(
      "https://api.github.com/users/aunncodes/events/public?per_page=50",
      {
        headers: githubHeaders,
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      console.error(`GitHub API returned ${response.status}`);
      return [];
    }

    const events = (await response.json()) as GitHubEvent[];
    const projects = new Map<string, CurrentProject>();

    for (const event of events) {
      if (event.type !== "PushEvent") {
        continue;
      }

      const existing = projects.get(event.repo.name);
      const commitCount = Math.max(event.payload?.size ?? 1, 1);

      if (existing) {
        existing.commits += commitCount;

        if (
          new Date(event.created_at).getTime() >
          new Date(existing.lastActive).getTime()
        ) {
          existing.lastActive = event.created_at;
        }

        continue;
      }

      projects.set(event.repo.name, {
        name: event.repo.name.split("/").at(-1) ?? event.repo.name,
        fullName: event.repo.name,
        commits: commitCount,
        lastActive: event.created_at,
        description: null,
      });
    }

    const recentProjects = [...projects.values()]
      .sort(
        (a, b) =>
          new Date(b.lastActive).getTime() -
          new Date(a.lastActive).getTime(),
      )
      .slice(0, 3);

    const focusProject = recentProjects[0];

    if (!focusProject) {
      return [];
    }

    try {
      const repositoryResponse = await fetch(
        `https://api.github.com/repos/${focusProject.fullName}`,
        {
          headers: githubHeaders,
          next: {
            revalidate: 3600,
          },
        },
      );

      if (repositoryResponse.ok) {
        const repository = (await repositoryResponse.json()) as {
          description: string | null;
        };

        recentProjects[0] = {
          ...focusProject,
          description: repository.description,
        };
      }
    } catch (error) {
      console.error("Could not load repository details:", error);
    }

    return recentProjects;
  } catch (error) {
    console.error("Could not load GitHub activity:", error);
    return [];
  }
}

function activityLabel(date: string) {
  const daysAgo = Math.max(
    0,
    Math.floor(
      (Date.now() - new Date(date).getTime()) / 86_400_000,
    ),
  );

  if (daysAgo === 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  if (daysAgo < 7) return `${daysAgo}d ago`;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

function commitLabel(commits: number) {
  return `${commits} recent ${commits === 1 ? "commit" : "commits"}`;
}

export default async function Home() {
  const currentProjects = await getCurrentProjects();
  const focusProject = currentProjects[0];
  const otherProjects = currentProjects.slice(1);

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">aunncodes</p>
          <h1>Hey!</h1>

          <p className="intro">
            I&apos;m Sahil. I&apos;m a backend programmer who likes building games, websites, and Chrome extensions.
          </p>
        </div>

        <Image
          src="/img.png"
          alt="Picture of me"
          className="avatar"
          width={112}
          height={112}
          priority
        />
      </section>

      <section className="section">
        <h2>About</h2>

        <p>
          I always love finding new repositories to contribute to on GitHub, and I also love working on my own random side projects whenever I get time. I code primarily in Python, TypeScript, and C++.
        </p>
      </section>

      {focusProject && (
        <section className="section">
          <div className="focus-heading">
            <h2>Currently working on</h2>

            <span className="focus-status">
              {activityLabel(focusProject.lastActive)}
            </span>
          </div>

          <a
            className="focus-card"
            href={`https://github.com/${focusProject.fullName}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="focus-content">
              <h3>{focusProject.name}</h3>

              <p>
                {focusProject.description ??
                  "One of my most recently active public projects."}
              </p>
            </div>

            <div className="focus-meta">
              <span>{commitLabel(focusProject.commits)}</span>
              <span className="focus-link">Open repository ↗</span>
            </div>
          </a>

          {otherProjects.length > 0 && (
            <div className="other-activity">
              <span>Also active:</span>

              <div className="other-activity-links">
                {otherProjects.map((project) => (
                  <a
                    href={`https://github.com/${project.fullName}`}
                    target="_blank"
                    rel="noreferrer"
                    key={project.fullName}
                  >
                    {project.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <section className="section">
        <h2>Projects</h2>

        <div className="projects">
          <a className="project" href="https://github.com/devilExE3/FactoryBuilder" target="_blank" rel="noreferrer">
            <div>
              <h3>Factory Builder</h3>
              <p>A Minecraft Datapack for a fun incremental factory game.</p>
            </div>

            <span>View</span>
          </a>

          <a className="project" href="https://github.com/aunncodes/TownOfSalem" target="_blank" rel="noreferrer">
            <div>
              <h3>Town Of Salem</h3>
              <p>A recreation of the popular game Town Of Salem, using Python and Node.js.</p>
            </div>

            <span>View</span>
          </a>

          <a className="project" href="https://github.com/aunncodes/Homebase" target="_blank" rel="noreferrer">
            <div>
              <h3>Homebase</h3>
              <p>A simplistic Chrome extension for a custom new tab page, with a variety of themes and tools.</p>
            </div>

            <span>View</span>
          </a>
        </div>
      </section>

      <section className="section">
        <h2>Contact</h2>

        <ul className="contact-list">
          <li>Email me through <a href="mailto:choprasahil.sc@gmail.com" target="_blank">choprasahil.sc@gmail.com</a>.</li>
          <li>Message me on discord through <a href="https://discord.com/users/682054289031823382" target="_blank" rel="noreferrer">aunn.exe</a>.</li>
          <li>Find my work on <a href="https://github.com/aunncodes" target="_blank" rel="noreferrer">GitHub</a>.</li>
        </ul>
      </section>
    </main>
  );
}