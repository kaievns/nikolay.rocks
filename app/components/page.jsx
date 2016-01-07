import PageDate from "unicorn-farts/components/page_date";
import PageContent from "unicorn-farts/components/page_content";
import Locker from "unicorn-farts/components/locker";
import connect from "unicorn-farts/store/connect";
import { loadPage } from "unicorn-farts/store/actions";
import TagsList from "./tags";
import NotFound from "./404";

const PageView = ({ page }) => {
  if (page) {
    return (
      <article className="page preview">
        <PageDate date={page.createdAt}/>

        {page.text && <PageContent text={page.text} />}

        {!page.text && <h1>{page.title}</h1>}
        {!page.text && <PageContent text={page.summary} />}
        {!page.text && <Locker/>}

        <a href="/" className="other-posts">&lt;- Other posts</a>
        <TagsList tags={page.tags} />
      </article>
    );
  } else if (page === false) {
    return <NotFound />;
  } else {
    return <article></article>; // still waiting
  }
}

export default connect(PageView, (store, dispatch) => {
  const page = store.page;

  if (page && !page.text && !page.loading) {
    page.loading = true;
    dispatch(loadPage(page));
  }

  return { page: page };
});
