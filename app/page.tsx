import GridLayout from "@/components/GridLayout";
import {
  getSiteInfo,
  getProjects,
  getSkills,
  getMilestones,
} from "@/lib/sanity.queries";

export default async function Home() {
  const [siteInfo, projects, techSkills, beyondSkills, milestones] =
    await Promise.all([
      getSiteInfo(),
      getProjects(),
      getSkills("tech"),
      getSkills("beyond"),
      getMilestones(),
    ]);

  return (
    <div className="w-full max-w-600">
      <GridLayout
        siteInfo={siteInfo}
        projects={projects}
        techSkills={techSkills}
        beyondSkills={beyondSkills}
        milestones={milestones}
      />
    </div>
  );
}
