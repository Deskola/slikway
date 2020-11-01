import React, {useEffect} from 'react';

function Profile() {
	useEffect(() => {
		document.title = 'Profile Silkway';
	});

	return (
		<p>Profile page</p>
	)
}

export default Profile;