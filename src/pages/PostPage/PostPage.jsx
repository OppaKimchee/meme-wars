import React from 'react';
import PostForm from '../../components/PostForm/PostForm';

const PostPage = (props) => {

	return (
		<div>
			<PostForm  user={props.user} />
		</div>
	);
};

export default PostPage;