window.config = {
  // default: '/'
  routerBasename: '/',
  extensions: [],
  showStudyList: true,
  servers: {
    dicomWeb: [
      {
        name: 'DCM4CHEE',
        wadoUriRoot:
          'http://101.101.211.211:8080/dcm4chee-arc/aets/DCM4CHEE/wado',
        qidoRoot: 'http://101.101.211.211:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
        wadoRoot: 'http://101.101.211.211:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
        qidoSupportsIncludeField: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        requestOptions: {
          requestFromBrowser: true,
        },
      },
    ],
  },
  // Extensions should be able to suggest default values for these?
  // Or we can require that these be explicitly set
  hotkeys: [
    // ~ Global
    {
      commandName: 'incrementActiveViewport',
      label: 'Next Image Viewport',
      keys: ['right'],
    },
    {
      commandName: 'decrementActiveViewport',
      label: 'Previous Image Viewport',
      keys: ['left'],
    },
    // Supported Keys: https://craig.is/killing/mice
    // ~ Cornerstone Extension
    { commandName: 'rotateViewportCW', label: 'Rotate Right', keys: ['r'] },
    { commandName: 'rotateViewportCCW', label: 'Rotate Left', keys: ['l'] },
    { commandName: 'customDrow', label: 'customDrow', keys: ['s'] },
    { commandName: 'toleranceUp', label: 'toleranceUp', keys: ['x'] },
    { commandName: 'toleranceDown', label: 'toleranceDown', keys: ['z'] },
    { commandName: 'toleranceLargeUp', label: 'toleranceLargeUp', keys: ['c'] },
    {
      commandName: 'toleranceLargeDown',
      label: 'toleranceLargeDown',
      keys: ['v'],
    },
    { commandName: 'invertViewport', label: 'Invert', keys: ['i'] },
    // {
    //   commandName: 'flipViewportVertical',
    //   label: 'Flip Horizontally',
    //   keys: ['h'],
    // },
    // {
    //   commandName: 'flipViewportHorizontal',
    //   label: 'Flip Vertically',
    //   keys: ['v'],
    // },
    { commandName: 'scaleUpViewport', label: 'Zoom In', keys: ['+'] },
    { commandName: 'scaleDownViewport', label: 'Zoom Out', keys: ['-'] },
    { commandName: 'fitViewportToWindow', label: 'Zoom to Fit', keys: ['='] },
    { commandName: 'resetViewport', label: 'Reset', keys: ['space'] },
    // clearAnnotations
    { commandName: 'nextImage', label: 'Next Image', keys: ['down'] },
    { commandName: 'previousImage', label: 'Previous Image', keys: ['up'] },
    // firstImage
    // lastImage
    {
      commandName: 'nextViewportDisplaySet',
      label: 'Previous Series',
      keys: ['pagedown'],
    },
    {
      commandName: 'previousViewportDisplaySet',
      label: 'Next Series',
      keys: ['pageup'],
    },
    // ~ Cornerstone Tools
    // { commandName: 'setZoomTool', label: 'Zoom', keys: ['z'] },
  ],
};
