const themeConfig = {
  token: {
    // Primary Colors
    colorPrimary: '#00ADB5',
    colorInfo: '#00ADB5',
    
    // Background Colors
    colorBgBase: '#222831',
    colorBgContainer: '#393E46',
    colorBgElevated: '#393E46',
    colorBgLayout: '#222831',
    
    // Text Colors
    colorText: '#EEEEEE',
    colorTextBase: '#EEEEEE',
    colorTextSecondary: 'rgba(238, 238, 238, 0.75)',
    colorTextTertiary: 'rgba(238, 238, 238, 0.5)',
    
    // Border Colors
    colorBorder: '#393E46',
    colorBorderSecondary: '#393E46',
    
    // Other
    borderRadius: 4,
  },
  components: {
    Button: {
      colorPrimary: '#00ADB5',
      colorPrimaryHover: '#0095A0',
      colorPrimaryActive: '#008A91',
      colorTextLightSolid: '#EEEEEE',
    },
    Card: {
      colorBgContainer: '#393E46',
      colorBorderSecondary: '#393E46',
      colorText: '#EEEEEE',
      colorTextHeading: '#EEEEEE',
    },
    Layout: {
      colorBgHeader: '#222831',
      colorBgBody: '#222831',
      colorBgContainer: '#222831',
      siderBg: '#222831',
      headerBg: '#222831',
    },
    Menu: {
      darkItemBg: '#222831',
      darkItemColor: '#EEEEEE',
      darkItemSelectedBg: '#393E46',
      darkItemSelectedColor: '#00ADB5',
      darkItemHoverBg: '#393E46',
    },
    Input: {
      colorBgContainer: '#393E46',
      colorBorder: '#393E46',
      colorText: '#EEEEEE',
      colorTextPlaceholder: 'rgba(238, 238, 238, 0.5)',
      activeBorderColor: '#00ADB5',
      hoverBorderColor: '#00ADB5',
    },
    Select: {
      colorBgContainer: '#393E46',
      colorBorder: '#393E46',
      colorText: '#EEEEEE',
      colorTextPlaceholder: 'rgba(238, 238, 238, 0.5)',
      colorIcon: '#EEEEEE',
      colorIconHover: '#00ADB5',
      optionSelectedBg: '#00ADB5',
    },
    Form: {
      colorText: '#EEEEEE',
      colorTextHeading: '#EEEEEE',
      colorTextLabel: '#EEEEEE',
    },
    Modal: {
      contentBg: '#393E46',
      headerBg: '#393E46',
      titleColor: '#EEEEEE',
    },
    Spin: {
      colorPrimary: '#00ADB5',
    },
    Message: {
      colorBgElevated: '#393E46',
      colorText: '#EEEEEE',
    },
    Popconfirm: {
      colorBgElevated: '#393E46',
      colorText: '#EEEEEE',
    },
    Dropdown: {
      colorBgElevated: '#393E46',
      controlItemBgHover: '#222831',
    }
  }
}

export default themeConfig 