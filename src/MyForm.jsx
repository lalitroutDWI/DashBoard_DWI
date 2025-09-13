// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Eye, EyeOff, User, Mail, Lock, CheckCircle, Skull } from "lucide-react";

// const validationSchema = Yup.object({
//   name: Yup.string()
//     .min(2, "Too short!")
//     .max(30, "Too long!")
//     .required("Required"),
//   email: Yup.string().email("Invalid email").required("Required"),
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Required"),
// });

// const MyForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Dark atmospheric elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-10 left-10 w-96 h-96 bg-gray-900 rounded-full blur-3xl opacity-30"></div>
//         <div className="absolute bottom-10 right-10 w-80 h-80 bg-gray-800 rounded-full blur-3xl opacity-20"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gray-700 rounded-full blur-3xl opacity-10"></div>
//       </div>

//       {/* Grid pattern overlay */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="w-full h-full" style={{
//           backgroundImage: `
//             linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
//           `,
//           backgroundSize: '50px 50px'
//         }}></div>
//       </div>

//       {/* Main form container */}
//       <div className="relative w-full max-w-md">
//         <div className="bg-gray-900/80 backdrop-blur-sm rounded-none border border-gray-700 shadow-2xl relative">
//           {/* Dark corner accents */}
//           <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white"></div>
//           <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white"></div>
//           <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white"></div>
//           <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white"></div>
          
//           <div className="p-8">
//             {/* Header */}
//             <div className="text-center mb-8">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-black border-2 border-white rounded-sm mb-6 shadow-lg">
//                 <Skull className="w-8 h-8 text-white" />
//               </div>
//               <h1 className="text-3xl font-light text-white mb-2 tracking-wider">
//                 CREATE ACCOUNT
//               </h1>
//               <p className="text-gray-400 text-sm font-mono uppercase tracking-widest">
//                 Enter the void
//               </p>
//             </div>

//             {submitted ? (
//               <div className="text-center py-12">
//                 <div className="relative mb-6">
//                   <CheckCircle className="w-16 h-16 text-white mx-auto" />
//                   <div className="absolute inset-0 w-16 h-16 mx-auto border border-white animate-ping"></div>
//                 </div>
//                 <h2 className="text-xl font-light text-white mb-3 tracking-wide">ACCOUNT CREATED</h2>
//                 <p className="text-gray-400 mb-6 font-mono text-sm">Welcome to the darkness</p>
//                 <button 
//                   onClick={() => setSubmitted(false)}
//                   className="px-6 py-2 bg-black border border-white text-white text-sm font-mono uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
//                 >
//                   Create Another
//                 </button>
//               </div>
//             ) : (
//               <Formik
//                 initialValues={{ name: "", email: "", password: "" }}
//                 validationSchema={validationSchema}
//                 onSubmit={(values, { resetForm, setSubmitting }) => {
//                   setTimeout(() => {
//                     console.log("Form Data:", values);
//                     setSubmitted(true);
//                     resetForm();
//                     setSubmitting(false);
//                   }, 1500);
//                 }}
//               >
//                 {({ isSubmitting, errors, touched, values }) => (
//                   <Form className="space-y-6">
//                     {/* Name Field */}
//                     <div className="space-y-2">
//                       <label className="block text-gray-300 font-mono text-xs uppercase tracking-widest">
//                         Full Name
//                       </label>
//                       <div className="relative">
//                         <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
//                         <Field
//                           type="text"
//                           name="name"
//                           placeholder="Enter your name"
//                           className={`w-full bg-black border-2 ${
//                             errors.name && touched.name 
//                               ? 'border-red-500' 
//                               : values.name 
//                               ? 'border-white'
//                               : 'border-gray-600 hover:border-gray-500 focus:border-white'
//                           } py-3 px-12 text-white placeholder-gray-500 font-mono text-sm transition-all duration-300 focus:outline-none focus:bg-gray-900`}
//                         />
//                       </div>
//                       <ErrorMessage
//                         name="name"
//                         component="div"
//                         className="text-red-400 text-xs font-mono ml-1"
//                       />
//                     </div>

//                     {/* Email Field */}
//                     <div className="space-y-2">
//                       <label className="block text-gray-300 font-mono text-xs uppercase tracking-widest">
//                         Email Address
//                       </label>
//                       <div className="relative">
//                         <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
//                         <Field
//                           type="email"
//                           name="email"
//                           placeholder="your@email.com"
//                           className={`w-full bg-black border-2 ${
//                             errors.email && touched.email 
//                               ? 'border-red-500' 
//                               : values.email && !errors.email
//                               ? 'border-white'
//                               : 'border-gray-600 hover:border-gray-500 focus:border-white'
//                           } py-3 px-12 text-white placeholder-gray-500 font-mono text-sm transition-all duration-300 focus:outline-none focus:bg-gray-900`}
//                         />
//                       </div>
//                       <ErrorMessage
//                         name="email"
//                         component="div"
//                         className="text-red-400 text-xs font-mono ml-1"
//                       />
//                     </div>

//                     {/* Password Field */}
//                     <div className="space-y-2">
//                       <label className="block text-gray-300 font-mono text-xs uppercase tracking-widest">
//                         Password
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
//                         <Field
//                           type={showPassword ? "text" : "password"}
//                           name="password"
//                           placeholder="Enter password"
//                           className={`w-full bg-black border-2 ${
//                             errors.password && touched.password 
//                               ? 'border-red-500' 
//                               : values.password && !errors.password
//                               ? 'border-white'
//                               : 'border-gray-600 hover:border-gray-500 focus:border-white'
//                           } py-3 px-12 pr-12 text-white placeholder-gray-500 font-mono text-sm transition-all duration-300 focus:outline-none focus:bg-gray-900`}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
//                         >
//                           {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                       <ErrorMessage
//                         name="password"
//                         component="div"
//                         className="text-red-400 text-xs font-mono ml-1"
//                       />
//                     </div>

//                     {/* Submit Button */}
//                     <div className="pt-6">
//                       <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className={`w-full bg-black border-2 border-white text-white font-mono text-sm uppercase tracking-widest py-4 transition-all duration-300 ${
//                           isSubmitting 
//                             ? 'opacity-50 cursor-not-allowed' 
//                             : 'hover:bg-white hover:text-black active:scale-95'
//                         } focus:outline-none`}
//                       >
//                         {isSubmitting ? (
//                           <div className="flex items-center justify-center">
//                             <div className="w-4 h-4 border border-gray-400 border-t-white animate-spin mr-3"></div>
//                             Processing...
//                           </div>
//                         ) : (
//                           "Create Account"
//                         )}
//                       </button>
//                     </div>

//                     {/* Footer */}
//                     <div className="text-center pt-6 border-t border-gray-700">
//                       <p className="text-gray-500 font-mono text-xs">
//                         Already have an account?{" "}
//                         <button 
//                           type="button"
//                           className="text-white hover:underline transition-all duration-300"
//                         >
//                           Sign In
//                         </button>
//                       </p>
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyForm;

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, User, Mail, Lock, CheckCircle } from "lucide-react";

// Validation schema with Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Too short!")
    .max(30, "Too long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const MyForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 w-full max-w-md">

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Account Created!</h2>
            <p className="text-gray-600 mb-6">Welcome! Your account has been set up successfully.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Another Account
            </button>
          </div>
        ) : (
             <>{/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-md">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Sign up to get started</p>
        </div>
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              setTimeout(() => {
                console.log("Form Data:", values);
                setSubmitted(true);
                resetForm();
                setSubmitting(false);
              }, 1500);
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      className={`w-full border ${
                        errors.name && touched.name 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                      } rounded-lg py-3 px-10 text-gray-900 placeholder-gray-500 transition-colors focus:outline-none focus:ring-2`}
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className={`w-full border ${
                        errors.email && touched.email 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                      } rounded-lg py-3 px-10 text-gray-900 placeholder-gray-500 transition-colors focus:outline-none focus:ring-2`}
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a password"
                      className={`w-full border ${
                        errors.password && touched.password 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                      } rounded-lg py-3 px-10 pr-10 text-gray-900 placeholder-gray-500 transition-colors focus:outline-none focus:ring-2`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors ${
                    isSubmitting 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:bg-blue-700 active:bg-blue-800'
                  } focus:outline-none focus:ring-2 focus:ring-blue-200`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>

                {/* Footer */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm">
                    Already have an account?{" "}
                    <button 
                      type="button"
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
          </>
        )}
        

      </div>
    </div>
  );
};

export default MyForm;