import React from 'react';
import PostForm from '../../components/PostForm/PostForm';

const PostPage = (props) => {

	return (
		<div>
			<PostForm  {...props} />
		</div>
	);
};

export default PostPage;