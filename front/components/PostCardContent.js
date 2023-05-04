import Link from "next/dist/client/link";
import PropTypes from "prop-types";
import React from "react";

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)+/g).map((s, i) => {
        if (s.match(/(#[^\s]+)/)) { //문자열과 정규식이 일치하는지는 match로 판별
          return (
            <Link key={i} href={`/hashtag/${s.slice(1)}/`}>
              <a>{s}</a>
            </Link>
          );
        }
        return s;
      })}
    </div>
  );
};

PostCardContent.proTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
