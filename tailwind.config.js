/*

Tailwind - The Utility-First CSS Framework

A project by Adam Wathan (@adamwathan), Jonathan Reinink (@reinink),
David Hemphill (@davidhemphill) and Steve Schoger (@steveschoger).

Welcome to the Tailwind config file. This is where you can customize
Tailwind specifically for your project. Don't be intimidated by the
length of this file. It's really just a big JavaScript object and
we've done our very best to explain each section.

View the full documentation at https://tailwindcss.com.


|-------------------------------------------------------------------------------
| The default config
|-------------------------------------------------------------------------------
|
| This variable contains the default Tailwind config. You don't have
| to use it, but it can sometimes be helpful to have available. For
| example, you may choose to merge your custom configuration
| values with some of the Tailwind defaults.
|
*/

// let defaultConfig = require('tailwindcss/defaultConfig')


/*
|-------------------------------------------------------------------------------
| Colors                                    https://tailwindcss.com/docs/colors
|-------------------------------------------------------------------------------
|
| Here you can specify the colors used in your project. To get you started,
| we've provided a generous palette of great looking colors that are perfect
| for prototyping, but don't hesitate to change them for your project. You
| own these colors, nothing will break if you change everything about them.
|
| We've used literal color names ("red", "blue", etc.) for the default
| palette, but if you'd rather use functional names like "primary" and
| "secondary", or even a numeric scale like "100" and "200", go for it.
|
*/

module.exports = {

  important: true,
  // prefix: '',
  // separator: ':',
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],

  theme: {

    /*
    |-----------------------------------------------------------------------------
    | Colors                                  https://tailwindcss.com/docs/colors
    |-----------------------------------------------------------------------------
    |
    | The color palette defined above is also assigned to the "colors" key of
    | your Tailwind config. This makes it easy to access them in your CSS
    | using Tailwind's config helper. For example:
    |
    | .error { color: config('colors.red') }
    |
    */

    colors: {
      'primary': '#d7df23',
      'transparent': 'transparent',
      'black': '#22292f',
      'dark-black':'#000000',
      'new-black':'#141318',
      'white': '#ffffff',
      'grey': '#b8c2cc',
      'custom-purple': '#7247C4',
      'custom-black': '#544837',
      'custom-grey': '#626262',
      'grey-light': '#dae1e7',
      'goldenrod': '#DAA520',
      "red": "#f44336",
      "red-50": "#ffebee",
      "red-100": "#ffcdd2",
      "red-200": "#ef9a9a",
      "red-300": "#e57373",
      "red-400": "#ef5350",
      "red-500": "#f44336",
      "red-600": "#e53935",
      "red-700": "#d32f2f",
      "red-800": "#c62828",
      "red-900": "#b71c1c",
      "red-100-accent": "#ff8a80",
      "red-200-accent": "#ff5252",
      "red-400-accent": "#ff1744",
      "red-700-accent": "#d50000",
      "slate-50": "#f8fafc",
      "slate-100": "#f1f5f9",
      "slate-200": "#e2e8f0",
      "slate-300": "#cbd5e1",
      "slate-400": "#94a3b8",
      "slate-500": "#64748b",
      "slate-600": "#475569",
      "slate-700": "#334155",
      "slate-800": "#1e293b",
      "slate-900": "#0f172a",
      "slate-950": "#020617",
      "pink": "#e91e63",
      "pink-50": "#fce4ec",
      "pink-100": "#f8bbd0",
      "pink-200": "#f48fb1",
      "pink-300": "#f06292",
      "pink-400": "#ec407a",
      "pink-500": "#e91e63",
      "pink-600": "#d81b60",
      "pink-700": "#c2185b",
      "pink-800": "#ad1457",
      "pink-900": "#880e4f",
      "pink-100-accent": "#ff80ab",
      "pink-200-accent": "#ff4081",
      "pink-400-accent": "#f50057",
      "pink-700-accent": "#c51162",
      "purple": "#9c27b0",
      "purple-50": "#f3e5f5",
      "purple-100": "#e1bee7",
      "purple-200": "#ce93d8",
      "purple-300": "#ba68c8",
      "purple-400": "#ab47bc",
      "purple-500": "#9c27b0",
      "purple-600": "#8e24aa",
      "purple-700": "#7b1fa2",
      "purple-800": "#6a1b9a",
      "purple-900": "#4a148c",
      "purple-100-accent": "#ea80fc",
      "purple-200-accent": "#e040fb",
      "purple-400-accent": "#d500f9",
      "purple-700-accent": "#aa00ff",
      "deep-purple": "#673ab7",
      "deep-purple-50": "#ede7f6",
      "deep-purple-100": "#d1c4e9",
      "deep-purple-200": "#b39ddb",
      "deep-purple-300": "#9575cd",
      "deep-purple-400": "#7e57c2",
      "deep-purple-500": "#673ab7",
      "deep-purple-600": "#5e35b1",
      "deep-purple-700": "#512da8",
      "deep-purple-800": "#4527a0",
      "deep-purple-900": "#311b92",
      "deep-purple-100-accent": "#b388ff",
      "deep-purple-200-accent": "#7c4dff",
      "deep-purple-400-accent": "#651fff",
      "deep-purple-700-accent": "#6200ea",
      "indigo": "#3f51b5",
      "indigo-50": "#e8eaf6",
      "indigo-100": "#c5cae9",
      "indigo-200": "#9fa8da",
      "indigo-300": "#7986cb",
      "indigo-400": "#5c6bc0",
      "indigo-500": "#3f51b5",
      "indigo-600": "#3949ab",
      "indigo-700": "#303f9f",
      "indigo-800": "#283593",
      "indigo-900": "#1a237e",
      "indigo-100-accent": "#8c9eff",
      "indigo-200-accent": "#536dfe",
      "indigo-400-accent": "#3d5afe",
      "indigo-700-accent": "#304ffe",
      "blue": "#2196f3",
      "blue-50": "#e3f2fd",
      "blue-100": "#bbdefb",
      "blue-200": "#90caf9",
      "blue-300": "#64b5f6",
      "blue-400": "#42a5f5",
      "blue-500": "#2196f3",
      "blue-600": "#1e88e5",
      "blue-700": "#1976d2",
      "blue-800": "#1565c0",
      "blue-900": "#0d47a1",
      "blue-100-accent": "#82b1ff",
      "blue-200-accent": "#448aff",
      "blue-400-accent": "#2979ff",
      "blue-700-accent": "#2962ff",
      "light-blue": "#03a9f4",
      "light-blue-50": "#e1f5fe",
      "light-blue-100": "#b3e5fc",
      "light-blue-200": "#81d4fa",
      "light-blue-300": "#4fc3f7",
      "light-blue-400": "#29b6f6",
      "light-blue-500": "#03a9f4",
      "light-blue-600": "#039be5",
      "light-blue-700": "#0288d1",
      "light-blue-800": "#0277bd",
      "light-blue-900": "#01579b",
      "light-blue-100-accent": "#80d8ff",
      "light-blue-200-accent": "#40c4ff",
      "light-blue-400-accent": "#00b0ff",
      "light-blue-700-accent": "#0091ea",
      "cyan": "#00bcd4",
      "cyan-50": "#e0f7fa",
      "cyan-100": "#b2ebf2",
      "cyan-200": "#80deea",
      "cyan-300": "#4dd0e1",
      "cyan-400": "#26c6da",
      "cyan-500": "#00bcd4",
      "cyan-600": "#00acc1",
      "cyan-700": "#0097a7",
      "cyan-800": "#00838f",
      "cyan-900": "#006064",
      "cyan-100-accent": "#84ffff",
      "cyan-200-accent": "#18ffff",
      "cyan-400-accent": "#00e5ff",
      "cyan-700-accent": "#00b8d4",
      "teal": "#009688",
      "teal-50": "#e0f2f1",
      "teal-100": "#b2dfdb",
      "teal-200": "#80cbc4",
      "teal-300": "#4db6ac",
      "teal-400": "#26a69a",
      "teal-500": "#009688",
      "teal-600": "#00897b",
      "teal-700": "#00796b",
      "teal-800": "#00695c",
      "teal-900": "#004d40",
      "teal-100-accent": "#a7ffeb",
      "teal-200-accent": "#64ffda",
      "teal-400-accent": "#1de9b6",
      "teal-700-accent": "#00bfa5",
      "green": "#4caf50",
      "green-50": "#e8f5e9",
      "green-100": "#c8e6c9",
      "green-200": "#a5d6a7",
      "green-300": "#81c784",
      "green-400": "#66bb6a",
      "green-500": "#4caf50",
      "green-600": "#43a047",
      "green-700": "#388e3c",
      "green-800": "#2e7d32",
      "green-900": "#1b5e20",
      "green-100-accent": "#b9f6ca",
      "green-200-accent": "#69f0ae",
      "green-400-accent": "#00e676",
      "green-700-accent": "#00c853",
      "light-green": "#8bc34a",
      "light-green-50": "#f1f8e9",
      "light-green-100": "#dcedc8",
      "light-green-200": "#c5e1a5",
      "light-green-300": "#aed581",
      "light-green-400": "#9ccc65",
      "light-green-500": "#8bc34a",
      "light-green-600": "#7cb342",
      "light-green-700": "#689f38",
      "light-green-800": "#558b2f",
      "light-green-900": "#33691e",
      "light-green-100-accent": "#ccff90",
      "light-green-200-accent": "#b2ff59",
      "light-green-400-accent": "#76ff03",
      "light-green-700-accent": "#64dd17",
      "lime": "#cddc39",
      "lime-50": "#f9fbe7",
      "lime-100": "#f0f4c3",
      "lime-200": "#e6ee9c",
      "lime-300": "#dce775",
      "lime-400": "#d4e157",
      "lime-500": "#cddc39",
      "lime-600": "#c0ca33",
      "lime-700": "#afb42b",
      "lime-800": "#9e9d24",
      "lime-900": "#827717",
      "lime-100-accent": "#f4ff81",
      "lime-200-accent": "#eeff41",
      "lime-400-accent": "#c6ff00",
      "lime-700-accent": "#aeea00",
      "yellow": "#ffeb3b",
      "yellow-50": "#fffde7",
      "yellow-100": "#fff9c4",
      "yellow-200": "#fff59d",
      "yellow-300": "#fff176",
      "yellow-400": "#ffee58",
      "yellow-500": "#ffeb3b",
      "yellow-600": "#fdd835",
      "yellow-700": "#fbc02d",
      "yellow-800": "#f9a825",
      "yellow-900": "#f57f17",
      "yellow-100-accent": "#ffff8d",
      "yellow-200-accent": "#ffff00",
      "yellow-400-accent": "#ffea00",
      "yellow-700-accent": "#ffd600",
      "amber": "#ffc107",
      "amber-50": "#fff8e1",
      "amber-100": "#ffecb3",
      "amber-200": "#ffe082",
      "amber-300": "#ffd54f",
      "amber-400": "#ffca28",
      "amber-500": "#ffc107",
      "amber-600": "#ffb300",
      "amber-700": "#ffa000",
      "amber-800": "#ff8f00",
      "amber-900": "#ff6f00",
      "amber-100-accent": "#ffe57f",
      "amber-200-accent": "#ffd740",
      "amber-400-accent": "#ffc400",
      "amber-700-accent": "#ffab00",
      "orange": "#ff9800",
      "orange-50": "#fff3e0",
      "orange-100": "#ffe0b2",
      "orange-200": "#ffcc80",
      "orange-300": "#ffb74d",
      "orange-400": "#ffa726",
      "orange-500": "#ff9800",
      "orange-600": "#fb8c00",
      "orange-700": "#f57c00",
      "orange-800": "#ef6c00",
      "orange-900": "#e65100",
      "orange-100-accent": "#ffd180",
      "orange-200-accent": "#ffab40",
      "orange-400-accent": "#ff9100",
      "orange-700-accent": "#ff6d00",
      "deep-orange": "#ff5722",
      "deep-orange-50": "#fbe9e7",
      "deep-orange-100": "#ffccbc",
      "deep-orange-200": "#ffab91",
      "deep-orange-300": "#ff8a65",
      "deep-orange-400": "#ff7043",
      "deep-orange-500": "#ff5722",
      "deep-orange-600": "#f4511e",
      "deep-orange-700": "#e64a19",
      "deep-orange-800": "#d84315",
      "deep-orange-900": "#bf360c",
      "deep-orange-100-accent": "#ff9e80",
      "deep-orange-200-accent": "#ff6e40",
      "deep-orange-400-accent": "#ff3d00",
      "deep-orange-700-accent": "#dd2c00",
      "brown": "#795548",
      "brown-50": "#efebe9",
      "brown-100": "#d7ccc8",
      "brown-200": "#bcaaa4",
      "brown-300": "#a1887f",
      "brown-400": "#8d6e63",
      "brown-500": "#795548",
      "brown-600": "#6d4c41",
      "brown-700": "#5d4037",
      "brown-800": "#4e342e",
      "brown-900": "#3e2723",
      "grey-50": "#fafafa",
      "grey-100": "#f5f5f5",
      "grey-200": "#eeeeee",
      "grey-300": "#e0e0e0",
      "grey-400": "#bdbdbd",
      "grey-500": "#9e9e9e",
      "grey-600": "#757575",
      "grey-700": "#616161",
      "grey-800": "#424242",
      "grey-900": "#212121",
      "blue-grey": "#607d8b",
      "blue-grey-50": "#eceff1",
      "blue-grey-100": "#cfd8dc",
      "blue-grey-200": "#b0bec5",
      "blue-grey-300": "#90a4ae",
      "blue-grey-400": "#78909c",
      "blue-grey-500": "#607d8b",
      "blue-grey-600": "#546e7a",
      "blue-grey-700": "#455a64",
      "blue-grey-800": "#37474f",
      "blue-grey-900": "#263238",
    },

    /*
    |-----------------------------------------------------------------------------
    | Screens                      https://tailwindcss.com/docs/responsive-design
    |-----------------------------------------------------------------------------
    |
    | Screens in Tailwind are translated to CSS media queries. They define the
    | responsive breakpoints for your project. By default Tailwind takes a
    | "mobile first" approach, where each screen size represents a minimum
    | viewport width. Feel free to have as few or as many screens as you
    | want, naming them in whatever way you'd prefer for your project.
    |
    | Tailwind also allows for more complex screen definitions, which can be
    | useful in certain situations. Be sure to see the full responsive
    | documentation for a complete list of options.
    |
    | Class name: .{screen}:{utility}
    |
    */

    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
    },

    /*
    |-----------------------------------------------------------------------------
    | Z-index                                https://tailwindcss.com/docs/z-index
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your z-index utility values. By default we
    | provide a sensible numeric scale. You can, of course, modify these
    | values as needed.
    |
    | Class name: .z-{index}
    |
    */

    zIndex: {
      'auto': 'auto',
      '0': 0,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50,
    },

    /*
    |-----------------------------------------------------------------------------
    | Fonts                                    https://tailwindcss.com/docs/fonts
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your project's font stack, or font families.
    | Keep in mind that Tailwind doesn't actually load any fonts for you.
    | If you're using custom fonts you'll need to import them prior to
    | defining them here.
    |
    | By default we provide a native font stack that works remarkably well on
    | any device or OS you're using, since it just uses the default fonts
    | provided by the platform.
    |
    | Class name: .font-{name}
    |
    */

    // Set to false in configuration
    fontFamily: {
      'sans': [
        'system-ui',
        'BlinkMacSystemFont',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
      'serif': [
        'Constantia',
        'Lucida Bright',
        'Lucidabright',
        'Lucida Serif',
        'Lucida',
        'DejaVu Serif',
        'Bitstream Vera Serif',
        'Liberation Serif',
        'Georgia',
        'serif',
      ],
      'mono': [
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ]
    },


    /*
    |-----------------------------------------------------------------------------
    | Text sizes                         https://tailwindcss.com/docs/text-sizing
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your text sizes. Name these in whatever way
    | makes the most sense to you. We use size names by default, but
    | you're welcome to use a numeric scale or even something else
    | entirely.
    |
    | By default Tailwind uses the "rem" unit type for most measurements.
    | This allows you to set a root font size which all other sizes are
    | then based on. That said, you are free to use whatever units you
    | prefer, be it rems, ems, pixels or other.
    |
    | Class name: .text-{size}
    |
    */

    fontSize: {
      'xs': '.75rem',     // 12px
      'sm': '.875rem',    // 14px
      'base': '1rem',     // 16px
      'lg': '1.125rem',   // 18px
      'xl': '1.25rem',    // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '4rem',      // 64px
      '7xl': '5rem',
    },


    /*
    |-----------------------------------------------------------------------------
    | Font weights                       https://tailwindcss.com/docs/font-weight
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your font weights. We've provided a list of
    | common font weight names with their respective numeric scale values
    | to get you started. It's unlikely that your project will require
    | all of these, so we recommend removing those you don't need.
    |
    | Class name: .font-{weight}
    |
    */

    fontWeight: {
      'light': 300,
      'normal': 400,
      'medium': 500,
      'semibold': 600,
      'bold': 700,
      'extrabold': 800,
      'black': 900,
    },


    /*
    |-----------------------------------------------------------------------------
    | Leading (line height)              https://tailwindcss.com/docs/line-height
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your line height values, or as we call
    | them in Tailwind, leadings.
    |
    | Class name: .leading-{size}
    |
    */

    lineHeight: {
      'none': 1,
      'tight': 1.25,
      'normal': 1.5,
      'loose': 2,
    },


    /*
    |-----------------------------------------------------------------------------
    | Tracking (letter spacing)       https://tailwindcss.com/docs/letter-spacing
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your letter spacing values, or as we call
    | them in Tailwind, tracking.
    |
    | Class name: .tracking-{size}
    |
    */

    // set to false in configuration
    letterSpacing: {
      'tight': '-0.05em',
      'normal': '0',
      'wide': '0.05em',
    },


    /*
    |-----------------------------------------------------------------------------
    | Text colors                         https://tailwindcss.com/docs/text-color
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your text colors. By default these use the
    | color palette we defined above, however you're welcome to set these
    | independently if that makes sense for your project.
    |
    | Class name: .text-{color}
    |
    */

    textColor: theme => ({
      inherit: "inherit",
      ...theme('colors'),
    }),


    /*
    |-----------------------------------------------------------------------------
    | Background colors             https://tailwindcss.com/docs/background-color
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your background colors. By default these use
    | the color palette we defined above, however you're welcome to set
    | these independently if that makes sense for your project.
    |
    | Class name: .bg-{color}
    |
    */

    backgroundColor: theme => theme('colors'),


    /*
    |-----------------------------------------------------------------------------
    | Background sizes               https://tailwindcss.com/docs/background-size
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your background sizes. We provide some common
    | values that are useful in most projects, but feel free to add other sizes
    | that are specific to your project here as well.
    |
    | Class name: .bg-{size}
    |
    */

    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
    },


    /*
    |-----------------------------------------------------------------------------
    | Border widths                     https://tailwindcss.com/docs/border-width
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your border widths. Take note that border
    | widths require a special "default" value set as well. This is the
    | width that will be used when you do not specify a border width.
    |
    | Class name: .border{-side?}{-width?}
    |
    */

    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
      '8': '8px',
    },


    /*
    |-----------------------------------------------------------------------------
    | Border colors                     https://tailwindcss.com/docs/border-color
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your border colors. By default these use the
    | color palette we defined above, however you're welcome to set these
    | independently if that makes sense for your project.
    |
    | Take note that border colors require a special "default" value set
    | as well. This is the color that will be used when you do not
    | specify a border color.
    |
    | Class name: .border-{color}
    |
    */

    borderColor: theme => ({
      default: theme('colors.grey-light'),
      ...theme('colors'),
    }),


    /*
    |-----------------------------------------------------------------------------
    | Border radius                    https://tailwindcss.com/docs/border-radius
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your border radius values. If a `default` radius
    | is provided, it will be made available as the non-suffixed `.rounded`
    | utility.
    |
    | If your scale includes a `0` value to reset already rounded corners, it's
    | a good idea to put it first so other values are able to override it.
    |
    | Class name: .rounded{-side?}{-size?}
    |
    */

    borderRadius: {
      'none': '0',
      'sm': '.125rem',
      default: '.25rem',
      'lg': '2rem',
      'full': '9999px',
    },


    /*
    |-----------------------------------------------------------------------------
    | Width                                    https://tailwindcss.com/docs/width
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your width utility sizes. These can be
    | percentage based, pixels, rems, or any other units. By default
    | we provide a sensible rem based numeric scale, a percentage
    | based fraction scale, plus some other common use-cases. You
    | can, of course, modify these values as needed.
    |
    |
    | It's also worth mentioning that Tailwind automatically escapes
    | invalid CSS class name characters, which allows you to have
    | awesome classes like .w-2/3.
    |
    | Class name: .w-{size}
    |
    */

    width: {
      'auto': 'auto',
      'px': '1px',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '24': '6rem',
      '32': '8rem',
      '48': '12rem',
      '64': '16rem',
      '1/2': '50%',
      '1/3': '33.33333%',
      '2/3': '66.66667%',
      '1/4': '25%',
      '3/4': '75%',
      '1/10': '10%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '9/10': '90%',
      '1/6': '16.66667%',
      '5/6': '83.33333%',
      '1/12': '8.33333%',
      '2/12': '16.66667%',
      '3/12': '25%',
      '4/12': '33.33333%',
      '5/12': '41.66667%',
      '6/12': '50%',
      '7/12': '58.33333%',
      '8/12': '66.66667%',
      '9/12': '75%',
      '10/12': '83.33333%',
      '11/12': '91.66667%',
      '19/20': '95%',
      'full': '100%',
      'screen': '100vw'
    },


    /*
    |-----------------------------------------------------------------------------
    | Height                                  https://tailwindcss.com/docs/height
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your height utility sizes. These can be
    | percentage based, pixels, rems, or any other units. By default
    | we provide a sensible rem based numeric scale plus some other
    | common use-cases. You can, of course, modify these values as
    | needed.
    |
    | Class name: .h-{size}
    |
    */

    height: {
      'auto': 'auto',
      'px': '1px',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '24': '6rem',
      '32': '8rem',
      '36': '10rem',
      '48': '12rem',
      '64': '16rem',
      '72': '30rem',
      'full': '100%',
      'screen': '100vh'
    },


    /*
    |-----------------------------------------------------------------------------
    | Minimum width                        https://tailwindcss.com/docs/min-width
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your minimum width utility sizes. These can
    | be percentage based, pixels, rems, or any other units. We provide a
    | couple common use-cases by default. You can, of course, modify
    | these values as needed.
    |
    | Class name: .min-w-{size}
    |
    */

    minWidth: {
      '0': '0',
      'full': '100%',
    },


    /*
    |-----------------------------------------------------------------------------
    | Minimum height                      https://tailwindcss.com/docs/min-height
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your minimum height utility sizes. These can
    | be percentage based, pixels, rems, or any other units. We provide a
    | few common use-cases by default. You can, of course, modify these
    | values as needed.
    |
    | Class name: .min-h-{size}
    |
    */

    minHeight: {
      '0': '0',
      'full': '100%',
      'screen': '100vh'
    },


    /*
    |-----------------------------------------------------------------------------
    | Maximum width                        https://tailwindcss.com/docs/max-width
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your maximum width utility sizes. These can
    | be percentage based, pixels, rems, or any other units. By default
    | we provide a sensible rem based scale and a "full width" size,
    | which is basically a reset utility. You can, of course,
    | modify these values as needed.
    |
    | Class name: .max-w-{size}
    |
    */

    maxWidth: {
      'xxs': '15rem',
      'xs': '20rem',
      'sm': '30rem',
      'md': '40rem',
      'lg': '50rem',
      'xl': '60rem',
      '2xl': '70rem',
      '3xl': '80rem',
      '4xl': '90rem',
      '5xl': '100rem',
      '6xl': '110rem',
      'full': '100%',
    },


    /*
    |-----------------------------------------------------------------------------
    | Maximum height                      https://tailwindcss.com/docs/max-height
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your maximum height utility sizes. These can
    | be percentage based, pixels, rems, or any other units. We provide a
    | couple common use-cases by default. You can, of course, modify
    | these values as needed.
    |
    | Class name: .max-h-{size}
    |
    */

    maxHeight: {
      'full': '100%',
      'screen': '100vh',
    },


    /*
    |-----------------------------------------------------------------------------
    | Padding                                https://tailwindcss.com/docs/padding
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your padding utility sizes. These can be
    | percentage based, pixels, rems, or any other units. By default we
    | provide a sensible rem based numeric scale plus a couple other
    | common use-cases like "1px". You can, of course, modify these
    | values as needed.
    |
    | Class name: .p{side?}-{size}
    |
    */

    padding: {
      'px': '1px',
      'base': '2.2rem',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '32': '8rem',
    },


    /*
    |-----------------------------------------------------------------------------
    | Margin                                  https://tailwindcss.com/docs/margin
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your margin utility sizes. These can be
    | percentage based, pixels, rems, or any other units. By default we
    | provide a sensible rem based numeric scale plus a couple other
    | common use-cases like "1px". You can, of course, modify these
    | values as needed.
    |
    | Class name: .m{side?}-{size}
    |
    */

    margin: {
      'auto': 'auto',
      'px': '1px',
      'base': '2.2rem',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '32': '8rem',
      '-px': '-1px',
      '-80px': '-80px',
      '-1': '-0.25rem',
      '-2': '-0.5rem',
      '-3': '-0.75rem',
      '-4': '-1rem',
    },

    order: {
      first: '-1',
      last: '999',
      normal: '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
    },

    container: {
      center: true,
      padding: '1rem',
    },


    /*
    |-----------------------------------------------------------------------------
    | Shadows                                https://tailwindcss.com/docs/shadows
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your shadow utilities. As you can see from
    | the defaults we provide, it's possible to apply multiple shadows
    | per utility using comma separation.
    |
    | If a `default` shadow is provided, it will be made available as the non-
    | suffixed `.shadow` utility.
    |
    | Class name: .shadow-{size?}
    |
    */

    boxShadow: {
      default: '0 2px 4px 0 rgba(0,0,0,0.10)',
      'md': '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
      'lg': '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
      'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      'outline': '0 0 0 3px rgba(52,144,220,0.5)',
      'none': 'none',
      'drop': '0 2px 8px 0 rgba(0,0,0,0.14)'
    },


    /*
    |-----------------------------------------------------------------------------
    | Opacity                                https://tailwindcss.com/docs/opacity
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your opacity utility values. By default we
    | provide a sensible numeric scale. You can, of course, modify these
    | values as needed.
    |
    | Class name: .opacity-{name}
    |
    */

    // NOTE: IF YOU WANT TO CUSTOMIZE OPACITY THAN UNCOMMENT BELOW OBJECT AND EDIT
    // ELSE JUST REMOVE IT OR COMMENT IT FOR LATER CUSTOMIZATION
    // opacity: {
    //   '0': '0',
    //   '25': '.25',
    //   '50': '.5',
    //   '75': '.75',
    //   '100': '1',
    // },


    /*
    |-----------------------------------------------------------------------------
    | SVG fill                                   https://tailwindcss.com/docs/svg
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your SVG fill colors. By default we just provide
    | `fill-current` which sets the fill to the current text color. This lets you
    | specify a fill color using existing text color utilities and helps keep the
    | generated CSS file size down.
    |
    | Class name: .fill-{name}
    |
    */

    fill: {
      'current': 'currentColor',
    },


    /*
    |-----------------------------------------------------------------------------
    | SVG stroke                                 https://tailwindcss.com/docs/svg
    |-----------------------------------------------------------------------------
    |
    | Here is where you define your SVG stroke colors. By default we just provide
    | `stroke-current` which sets the stroke to the current text color. This lets
    | you specify a stroke color using existing text color utilities and helps
    | keep the generated CSS file size down.
    |
    | Class name: .stroke-{name}
    |
    */

    stroke: {
      'current': 'currentColor',
    },
  },


  /*
  |-----------------------------------------------------------------------------
  | variants                  https://tailwindcss.com/docs/configuration#modules
  |-----------------------------------------------------------------------------
  |
  | Here is where you control which modules are generated and what variants are
  | generated for each of those modules.
  |
  | Currently supported variants:
  |   - responsive
  |   - hover
  |   - focus
  |   - active
  |   - group-hover
  |
  | To disable a module completely, use `false` instead of an array.
  |
  */

  variants: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColor: ['responsive', 'hover', 'focus'],
    // backgroundPosition: ['responsive'],
    // backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: [],
    borderColor: ['responsive', 'hover'],
    borderRadius: [],
    borderStyle: ['responsive'],
    borderWidth: ['responsive'],
    cursor: [],
    display: ['responsive'],
    flexDirection: ['responsive'],
    flexWrap: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    justifyContent: ['responsive'],
    alignContent: ['responsive'],
    flex: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    float: ['responsive'],
    fontWeight: ['responsive', 'hover'],
    height: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    // listStyleType: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    opacity: ['responsive'],
    outline: ['focus'],
    overflow: ['responsive'],
    order: ['responsive', 'hover', 'focus'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    inset: ['responsive'],
    resize: ['responsive'],
    boxShadow: ['responsive', 'hover', 'focus'],
    fill: [],
    stroke: [],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColor: ['responsive', 'hover', 'focus'],
    fontSize: ['responsive'],
    fontStyle: ['responsive', 'hover', 'focus'],
    fontSmoothing: ['responsive', 'hover', 'focus'],
    textDecoration: ['responsive', 'hover', 'focus'],
    textTransform: ['responsive', 'hover', 'focus'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    wordBreak: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive'],
  },


  /*
  |-----------------------------------------------------------------------------
  | Plugins                                https://tailwindcss.com/docs/plugins
  |-----------------------------------------------------------------------------
  |
  | Here is where you can register any plugins you'd like to use in your
  | project. Tailwind's built-in `container` plugin is enabled by default to
  | give you a Bootstrap-style responsive container component out of the box.
  |
  | Be sure to view the complete plugin documentation to learn more about how
  | the plugin system works.
  |
  */

  plugins: [],

  corePlugins: {
    fontFamily: false,
    letterSpacing: false,
    backgroundPosition: false,
    backgroundRepeat: false,
    listStyleType: false,
  }

}