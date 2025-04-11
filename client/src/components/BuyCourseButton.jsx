// import React, { useEffect } from "react";
// import { Button } from "./ui/button";
// import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";

// const BuyCourseButton = ({ courseId }) => {
//   const [createCheckoutSession, {data, isLoading, isSuccess, isError, error }] =
//     useCreateCheckoutSessionMutation();

//   const purchaseCourseHandler = async () => {
//     await createCheckoutSession(courseId);
//   };

//   useEffect(()=>{
//     if(isSuccess){
//        if(data?.url){
//         window.location.href = data.url; // Redirect to stripe checkout url
//        }else{
//         toast.error("Invalid response from server.")
//        }
//     } 
//     if(isError){
//       toast.error(error?.data?.message || "Failed to create checkout session")
//     }
//   },[data, isSuccess, isError, error])

//   return (
//     <Button
//       disabled={isLoading}
//       onClick={purchaseCourseHandler}
//       className="w-full"
//     >
//       {isLoading ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Please wait
//         </> 
//       ) : (
//         "Purchase Course"
//       )}
//     </Button>
//   );
// };

// export default BuyCourseButton;


// import React, { useEffect } from "react";
// import { Button } from "./ui/button";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { useInitiateRazorpayCheckoutMutation } from "@/features/api/purchaseApi";
// // import { useInitiateRazorpayCheckoutMutation } from "@/features/api/purchaseApi";

// const BuyCourseButton = ({ courseId }) => {
//   const [initiateCheckout, { data, isLoading, isSuccess, isError, error }] =
//     useInitiateRazorpayCheckoutMutation();

//   const purchaseCourseHandler = async () => {
//     await initiateCheckout({ courseId });
//   };

//   useEffect(() => {
//     if (isSuccess && data) {
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: data.amount,
//         currency: "INR",
//         name: "LMS Platform",
//         description: "Course Purchase",
//         image: "/logo.png",
//         order_id: data.orderId,
//         handler: function (response) {
//           toast.success("Payment successful!");
//           // Optional: Call backend to verify payment
//         },
//         prefill: {
//           name: data?.user?.name || "LMS User",
//           email: data?.user?.email || "",
//         },
//         theme: {
//           color: "#6366f1",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     }

//     if (isError) {
//       toast.error(error?.data?.message || "Failed to initiate payment");
//     }
//   }, [isSuccess, data, isError, error]);

//   return (
//     <Button
//       disabled={isLoading}
//       onClick={purchaseCourseHandler}
//       className="w-full"
//     >
//       {isLoading ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Please wait
//         </>
//       ) : (
//         "Purchase Course"
//       )}
//     </Button>
//   );
// };

// export default BuyCourseButton;
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInitiateRazorpayCheckoutMutation } from "@/features/api/purchaseApi";

const BuyCourseButton = ({ courseId }) => {
  const navigate = useNavigate();

  const [initiateCheckout, { data, isLoading, isSuccess, isError, error }] =
    useInitiateRazorpayCheckoutMutation();

  const purchaseCourseHandler = async () => {
    try {
      await initiateCheckout({ courseId });
    } catch (err) {
      toast.error("Failed to initiate payment. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      const options = {
        key: data.key || import.meta.env.VITE_RAZORPAY_KEY_ID, // Use backend key or fallback to environment variable
        amount: data.amount,
        currency: data.currency || "INR",
        name: "LMS Platform",
        description: "Course Purchase",
        image: "/logo.png",
        order_id: data.orderId,
        handler: async function (response) {
          const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          } = response;

          try {
            const verifyRes = await axios.post(
              "http://localhost:8080/api/v1/purchase/razorpay/verify-payment", // Updated endpoint
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              {
                withCredentials: true,
                // headers: {
                //   Authorization: `Bearer ${localStorage.getItem("token")}`,
                // },
              }
            );

            if (verifyRes.data.success) {
              toast.success("Payment successful! 🎉");
              navigate(`/course-progress/${courseId}`);
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (err) {
            toast.error("Error verifying payment.");
            console.error(err);
          }
        },
        prefill: {
          name: data?.user?.name || "LMS User",
          email: data?.user?.email || "",
        },
        theme: {
          color: "#6366f1",
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
          paylater: true,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }

    if (isError) {
      toast.error(error?.data?.message || "Failed to initiate payment");
    }
  }, [isSuccess, data, isError, error, courseId, navigate]);

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;