export function formatRoute(
  path: string,
  functionName: string,
  methodRoute: string,
  pathRoute: string
) {
  return {
    handler: `${path}/handlers/${functionName}`,
    events: [
      {
        http: {
          method: methodRoute,
          path: pathRoute,
        },
      },
    ],
    // Remove this if you want to disable Canary Deployments
    deploymentSettings: {
      type: "Linear10PercentEvery1Minute",
      alias: "Live",
    },
  };
}
