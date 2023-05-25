const getters = {
	token: state => state.user.token,
	avatar: state => state.user.avatar,
	userId: state => state.user.userId,
	name: state => state.user.name,
	roles: state => state.user.roles,
	permissions: state => state.user.permissions
}
export default getters
