const defaultConfig = {
  lang: 'zh',
  timeout: 5000,
  appId: '19900105'
}
export const custom = {
  config: {}
}

const getConfig = () => Object.assign(defaultConfig, custom.config)

export default getConfig
