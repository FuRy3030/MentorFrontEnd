/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias['@elastic/eui/lib'] = '@elastic/eui/dist/eui';
        }
        //if (isServer) {
        //     config.externals = config.externals.map(eachExternal => {
        //       if (typeof eachExternal !== 'function') {
        //         return eachExternal;
        //       }
      
        //       return (context, callback) => {
        //         if (context.request.indexOf('@elastic/eui') > -1) {
        //           return callback();
        //         }
      
        //         return eachExternal(context, callback);
        //       };
        //     });
      
          //   // Mock HTMLElement on the server-side
          //   const definePluginId = config.plugins.findIndex(
          //     p => p.constructor.name === 'DefinePlugin'
          //   );
      
          //   config.plugins[definePluginId].definitions = {
          //     ...config.plugins[definePluginId].definitions,
          //     HTMLElement: function () {},
          //     window: function(){},
          //   };
          // }

          // config.resolve.mainFields = ['module', 'main'];
      
          return config;
    },
}

module.exports = nextConfig
