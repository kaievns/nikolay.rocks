import PageDate from "unicorn-farts/components/page_date";
import PageContent from "unicorn-farts/components/page_content";
import TagsList from "./tags";

export default ({ page }) => {
  return (
    <section className="page preview">
      <PageDate date={page.createdAt}/>

      <h2>{page.title}</h2>

      <PageContent text={page.summary} />

      <a href={page.path}>Keep reading -&gt;</a>
      <TagsList tags={page.tags} />
    </section>
  );
}
