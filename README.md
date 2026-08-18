Analyze this entire repository and create a project-specific knowledge and instruction system for GitLab Duo to reduce unnecessary codebase exploration and improve response time for regular development tasks.

## Goal

I use GitLab Duo regularly for development work in this repository. Currently, Duo often spends significant time exploring the codebase before answering or making changes.

Create project-specific `AGENTS.md`, `chat-rules.md`, and `SKILL.md` files so Duo can understand the project's architecture, conventions, important file locations, reusable patterns, and common workflows without repeatedly scanning unrelated parts of the repository.

The rules must help Duo:

* Find the relevant code faster.
* Avoid scanning the entire repository unnecessarily.
* Reuse existing implementations and patterns.
* Avoid asking unnecessary questions when the repository already contains the answer.
* Make minimal, targeted changes.
* Understand which files/directories are relevant for different types of tasks.
* Load detailed knowledge only when relevant to the current task.

## Step 1 — Analyze the repository

First inspect the repository structure and identify:

1. Frontend technology and structure.
2. Backend technology and structure.
3. API/service architecture.
4. State management.
5. UI/component architecture.
6. Common reusable components.
7. Loading and error-handling patterns.
8. Authentication/authorization patterns.
9. Testing framework and test organization.
10. Build and deployment process.
11. CI/CD configuration.
12. Important configuration files.
13. Database/data-access patterns.
14. Logging and exception-handling patterns.
15. Git branching/commit conventions if they can be determined.
16. Frequently related files/modules.
17. Areas that should NOT normally be modified.
18. Existing documentation that should be treated as authoritative.

Do not modify application source code during this analysis.

## Step 2 — Create AGENTS.md

Create a root-level `AGENTS.md`.

It should contain concise, high-value project knowledge:

* Project overview.
* Architecture.
* Directory/file map.
* Important modules.
* Frontend conventions.
* Backend conventions.
* API conventions.
* Testing conventions.
* Build/run commands.
* Deployment information.
* Important dependencies.
* Existing reusable patterns.
* Rules for modifying code.
* Rules for investigating issues.
* Common task → relevant files mapping.

Most importantly, include an investigation strategy:

1. Start with the file/module directly related to the request.
2. Follow imports/references to identify the immediate dependencies.
3. Inspect existing implementations of the same or similar feature.
4. Reuse existing patterns.
5. Expand the investigation only when required.
6. Do NOT scan the entire repository for a localized change.
7. Do NOT inspect unrelated modules unless there is evidence they affect the issue.

Keep `AGENTS.md` concise. Do not copy source code into it.

## Step 3 — Create GitLab Duo chat rules

Create the appropriate GitLab Duo custom rules file:

`.gitlab/duo/chat-rules.md`

Rules should be short and actionable.

Include rules such as:

* Prefer existing project patterns.
* Search the most relevant directory first.
* Avoid full-repository exploration for localized tasks.
* Reuse existing components, services, utilities and APIs.
* Do not introduce new libraries when an existing dependency solves the problem.
* Make the smallest reasonable change.
* Do not modify unrelated files.
* Follow existing naming and formatting conventions.
* Before creating a new implementation, search for an existing equivalent.
* When debugging, trace the actual execution path instead of exploring unrelated code.
* Use existing loading, error, logging and validation patterns.
* Run the most relevant tests/build checks after changes.

Do NOT put large project documentation into chat-rules.md.

## Step 4 — Create Agent Skills

Create a `skills/` directory containing task-specific skills.

Only create skills that are genuinely useful based on this repository.

At minimum, consider these categories if applicable:

skills/
├── frontend/
│   └── SKILL.md
├── backend/
│   └── SKILL.md
├── api-debugging/
│   └── SKILL.md
├── testing/
│   └── SKILL.md
├── git/
│   └── SKILL.md
└── deployment/
└── SKILL.md

If the repository has other important workflows, create additional skills.

Each `SKILL.md` must:

* Have a clear name.
* Have a precise description so the skill is activated only for relevant tasks.
* Identify the relevant directories/files.
* Explain the normal investigation sequence.
* Explain existing project patterns that should be reused.
* Explain common mistakes to avoid.
* Include concise step-by-step instructions.
* Avoid duplicating the entire `AGENTS.md`.
* Avoid copying source code unnecessarily.

For example, the API debugging skill should tell Duo how to trace:

Frontend component
→ API/service call
→ endpoint/controller
→ business service
→ repository/data layer
→ response/error handling

Use the ACTUAL architecture discovered in this repository rather than assuming this exact structure.

## Step 5 — Create a task-to-location map

Inside `AGENTS.md`, create a concise mapping such as:

| Task                   | Start Here                                 |
| ---------------------- | ------------------------------------------ |
| React UI change        | actual relevant frontend directory         |
| API change             | actual API/controller directory            |
| Backend business logic | actual service directory                   |
| API debugging          | actual frontend service + backend endpoint |
| Unit tests             | actual test directories                    |
| Build issue            | actual build/config files                  |
| Deployment             | actual CI/CD/deployment files              |

Use real paths from this repository.

## Step 6 — Optimize specifically for response time

The primary objective is NOT documentation completeness.

Optimize the files for efficient AI context usage.

Therefore:

* Keep global rules short.
* Do not duplicate information between files.
* Put general project knowledge in `AGENTS.md`.
* Put behavioral rules in `chat-rules.md`.
* Put specialized workflows in `SKILL.md`.
* Do not put large source-code excerpts into these files.
* Do not list every file in the repository.
* Identify only important directories and entry points.
* Tell Duo where to start investigation for common tasks.
* Avoid instructions that force Duo to inspect many files unnecessarily.

## Step 7 — Verify the result

After creating the files:

1. Review all generated files.
2. Remove duplicated instructions.
3. Remove unnecessary information.
4. Make sure paths actually exist.
5. Make sure instructions match the real project.
6. Make sure skills are task-specific.
7. Make sure the global rules are concise.
8. Make sure no application source code was unnecessarily modified.

Finally provide a summary showing:

* Files created.
* Purpose of each file.
* Skills created.
* How the new structure should reduce unnecessary codebase exploration.
* Any assumptions or areas that require manual review.

Do not modify application functionality as part of this task.
Only create/update the Duo knowledge, rules, and skill files.
