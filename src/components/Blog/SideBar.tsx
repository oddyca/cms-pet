// import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import HorizontallDivider from '../Dividers/HorizontalDivider';

import twitter from '/twit-bw.svg';
import instagram from '/inst-bw.svg';
import facebook from '/fb-bw.svg';
import { TSideBarProps, TPost } from '../../types/types';

export default function SideBar({ initialData }: TSideBarProps) {
  const { pathname } = useLocation();

  const filteredPosts = initialData?.data
    .filter(
      (post: TPost) =>
        `/blog/${post.attributes.tag.toLocaleLowerCase()}` !== pathname,
    )
    .slice(0, 2);

  return (
    <div className="flex flex-col gap-4">
      {pathname != '/blog' && (
        <div className="flex flex-col gap-4">
          <p className="text-gray-400">SEE ALSO</p>
          <div className="flex flex-col gap-4">
            {filteredPosts.slice(0, 2).map((post) => (
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
                    {new Date(post.attributes.publishedAt).toLocaleDateString()}
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
            ))}
          </div>
          <HorizontallDivider />
        </div>
      )}
      <div className="flex flex-col gap-4">
        <p>Follow us on</p>
        <div className="flex gap-4">
          <Link to="https://x.com/">
            <img
              src={twitter}
              alt="twitter logo icon"
              className="w-7 h-auto hover:scale-110"
            />
          </Link>
          <Link to="https://instagram.com/">
            <img
              src={instagram}
              alt="instagram logo icon"
              className="w-7 h-auto hover:scale-110"
            />
          </Link>
          <Link to="https://facebook.com/">
            <img
              src={facebook}
              alt="facebook logo icon"
              className="w-7 h-auto hover:scale-110"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
