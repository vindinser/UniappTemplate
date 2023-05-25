import color from './color.js'
import tabbar from './tabbar.js'

const sys = uni.$u.sys()

module.exports = {
	config: {
		baseUrl: 'https://vue.ruoyi.vip/prod-api',
		// baseUrl: '/dev-api',
		
		// 测试
		newUpload: 'http://27.128.238.14:8007/files/fileSubmit', // 图片上传（路径）
		thumbnail_1080: 'http://27.128.238.14:8001/pic_thumbnail_1080', // 1080图片查看（路径拼接）
		
		// 正式
		// newUpload: 'http://erp.hzdfpm.com:9097/files/fileSubmit',
		// thumbnail_1080: 'http://erp.hzdfpm.com:8001/pic_thumbnail_1080',
		
		// #ifdef H5
		// baseUrl: '/dev-api',
		preseUrl: '/prese-api',
		// #endif
		// #ifndef H5
		// baseUrl: 'http://192.168.7.139:9000',
		preseUrl: 'http://192.168.7.139:9301',
		// #endif
		
		selectUrl: 'http://192.168.7.161/select-parking-space',
		tabbar: [ ...tabbar ],
	},
	color: {
		...color
	},
	props: {
		actionSheet: {
			
		},
		album: {
			
		},
		alert: {
			
		},
		avatar: {
			
		},
		avatarGroup: {
			
		},
		backtop: {
			
		},
		badge: {
			
		},
		button: {
			// shape: 'circle'
		},
		calendar: {
			
		},
		carKeyboard: {
			
		},
		cell: {
			
		},
		cellGroup: {
			
		},
		checkbox: {
			activeColor: color.primary
		},
		checkboxGroup: {
			
		},
		circleProgress: {
			
		},
		code: {
			
		},
		codeInput: {
			
		},
		col: {
			
		},
		collapse: {
			
		},
		collapseItem: {
			
		},
		columnNotice: {
			
		},
		countDown: {
			
		},
		countTo: {
			color: '#303133'
		},
		datetimePicker: {
			
		},
		divider: {
			
		},
		empty: {
			
		},
		form: {
			labelWidth: 75,
			errorType: 'toast'
		},
		formItem: {
			borderBottom: true
		},
		gap: {
			
		},
		grid: {
			col: 4
		},
		gridItem: {
			
		},
		icon: {
			
		},
		image: {
			
		},
		indexAnchor: {
			
		},
		indexList: {
			
		},
		input: {
			border: 'none',
			disabledColor: '#ffffff'
		},
		keyboard: {
			
		},
		line: {
			
		},
		lineProgress: {
			
		},
		link: {
			
		},
		list: {
			
		},
		listItem: {
			
		},
		loadingIcon: {
			
		},
		loadingPage: {
			
		},
		loadmore: {
			
		},
		modal: {
			
		},
		navbar: {
			placeholder: true,
			autoBack: true
		},
		noNetwork: {
			
		},
		noticeBar: {
			
		},
		notify: {
			
		},
		numberBox: {
			
		},
		numberKeyboard: {
			
		},
		overlay: {
			
		},
		parse: {
			
		},
		picker: {
			
		},
		popup: {
			
		},
		radio: {
			
		},
		radioGroup: {
			
		},
		rate: {
			
		},
		readMore: {
			
		},
		row: {
			
		},
		rowNotice: {
			
		},
		scrollList: {
			
		},
		search: {
			shape: 'square',
			actionText: '查询'
		},
		section: {
			
		},
		skeleton: {
			
		},
		slider: {
			
		},
		statusBar: {
			
		},
		steps: {
			
		},
		stepsItem: {
			
		},
		sticky: {
			bgColor: '#ffffff',
			customNavHeight: sys.statusBarHeight + 44
		},
		subsection: {
			activeColor: color.primary
		},
		swipeAction: {
			
		},
		swipeActionItem: {
			
		},
		swiper: {
			
		},
		swiperIndicator: {
			
		},
		switch: {
			
		},
		tabbar: {
			border: false,
			inactiveColor: '#333333',
			activeColor: color.primary
		},
		tabbarItem: {
			
		},
		tabs: {
			lineColor: color.primary
		},
		tag: {
			
		},
		text: {
			
		},
		textarea: {
			
		},
		toast: {
			
		},
		toolbar: {
			
		},
		tooltip: {
			
		},
		transition: {
			
		},
		upload: {
			
		}
	}
}
