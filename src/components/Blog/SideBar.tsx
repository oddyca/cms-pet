import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import HorizontallDivider from '../Dividers/HorizontalDivider';

import TwitterLogo from '@/assets/TwitterLogo';
import InstaLogo from '@/assets/InstaLogo';
import FBLogo from '@/assets/FBLogo';
import { TSideBarProps, TPost } from '@/types/types';

export default function SideBar({ initialData }: TSideBarProps) {
  const { pathname } = useLocation();

  const filteredPosts = initialData
    ? initialData.data
        .filter(
          (post: TPost) =>
            `/blog/${post.attributes.tag.toLocaleLowerCase()}` !== pathname,
        )
        .slice(0, 2)
    : '';

  return (
    <div className="flex flex-col gap-4">
      {pathname != '/blog' && (
        <div className="flex flex-col gap-4">
          <p className="text-gray-400">SEE ALSO</p>
          <div className="flex flex-col gap-4">
            {filteredPosts ? (
              filteredPosts.slice(0, 2).map((post) => (
                <div key={post.id} className="flex flex-col gap-2">
                  <h3 className="font-bold">{post.attributes.title}</h3>
                  <Link
                    to={`/blog/${post.attributes.tag}/${post.attributes.slug}`}
                    className="hover:text-link-blue-100"
                  >
                    Read more &#10141;
                  </Link>
                  <div className="flex place-self-end items-center gap-2 text-sm">
                    <p>
                      {new Date(
                        post.attributes.publishedAt,
                      ).toLocaleDateString()}
                    </p>
                    <p>•</p>
                    <NavLink
                      to={`/blog/${post.attributes.tag}`}
                      className="px-4 py-1 border rounded-full border-black hover:text-link-blue-100 hover:border-link-blue-100"
                    >
                      {post.attributes.tag}
                    </NavLink>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <HorizontallDivider />
        </div>
      )}
      <div className="flex flex-col gap-4">
        <p>Follow us on</p>
        <div className="flex gap-4">
          <Link to="https://x.com/">
            <TwitterLogo fillColor="black" />
          </Link>
          <Link to="https://instagram.com/">
            <InstaLogo fillColor="black" />
          </Link>
          <Link to="https://facebook.com/">
            <FBLogo fillColor="black" />
          </Link>
        </div>
      </div>
    </div>
  );
}
