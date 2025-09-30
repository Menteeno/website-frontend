import {
  useV1_auth_send_codeMutation,
  useV1_auth_verify_codeMutation,
} from "../services/menteenoApi.generated";

/**
 * Example component demonstrating usage of generated RTK Query hooks
 */
export default function ApiExample() {
  const [sendCode, { isLoading: isSendingCode }] =
    useV1_auth_send_codeMutation();
  const [verifyCode, { isLoading: isVerifyingCode }] =
    useV1_auth_verify_codeMutation();

  const handleSendCode = async () => {
    try {
      const result = await sendCode({
        body: {
          mobile: "+1234567890",
          // Add other required fields based on SendCodeRequest type
        },
      }).unwrap();

      console.log("Code sent successfully:", result);
    } catch (error) {
      console.error("Failed to send code:", error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const result = await verifyCode({
        body: {
          mobile: "+1234567890",
          code: "123456",
          // Add other required fields based on VerifyCodeRequest type
        },
      }).unwrap();

      console.log("Code verified successfully:", result);
    } catch (error) {
      console.error("Failed to verify code:", error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">API Example</h2>

      <div className="space-x-2">
        <button
          onClick={handleSendCode}
          disabled={isSendingCode}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {isSendingCode ? "Sending..." : "Send Code"}
        </button>

        <button
          onClick={handleVerifyCode}
          disabled={isVerifyingCode}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
        >
          {isVerifyingCode ? "Verifying..." : "Verify Code"}
        </button>
      </div>
    </div>
  );
}
