import Breadcrumbs from "@/components/ui/breadcrumbs";
import PostHero from "@/components/blocks/post-hero";
import PortableTextRenderer from "@/components/portable-text-renderer";
import {
  fetchSanityPostBySlug,
  fetchSanityPostsStaticParams,
} from "@/sanity/lib/fetch";
import { generatePageMetadata } from "@/sanity/lib/metadata";
import MissingSanityPage from "@/components/ui/missing-sanity-page";

export const dynamic = "force-static";
export const dynamicParams = false;

const FALLBACK_STATIC_POST_SLUGS = ["placeholder"];

type BreadcrumbLink = {
  label: string;
  href: string;
};

export async function generateStaticParams() {
  const posts = await fetchSanityPostsStaticParams();

  if (!posts.length) {
    return FALLBACK_STATIC_POST_SLUGS.map((slug) => ({ slug }));
  }

  return posts
    .filter((post) => post.slug?.current)
    .map((post) => ({
      slug: post.slug!.current,
    }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityPostBySlug({ slug: params.slug });

  if (!post) {
    return {
      title: `Missing Sanity post: ${params.slug}`,
      robots: "noindex, nofollow",
    };
  }

  return generatePageMetadata({ page: post, slug: `blog/${params.slug}` });
}

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityPostBySlug(params);

  if (!post) {
    return <MissingSanityPage document="post" slug={params.slug} />;
  }

  const links: BreadcrumbLink[] = post
    ? [
        {
          label: "Home",
          href: "/",
        },
        {
          label: "Blog",
          href: "/blog",
        },
        {
          label: post.title as string,
          href: "#",
        },
      ]
    : [];

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <article className="max-w-3xl mx-auto">
          <Breadcrumbs links={links} />
          <PostHero {...post} />
          {post.body && <PortableTextRenderer value={post.body} />}
        </article>
      </div>
    </section>
  );
}
