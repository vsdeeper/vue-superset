const config = {
  default: {
    lang: 'zh',
    timeout: 5000,
    appId: '19900105'
  },
  custom: {}
}
const getConfig = () => Object.assign(config.default, config.custom)

export default getConfig
export {
  config
}
