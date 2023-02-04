import { Modal } from "@mui/material";

export default function ChangeStatusModal({
  children,
  isChangeStatusModalOpen,
  setIsChangeStatusModalOpen,
}) {
  return (
    <Modal
      open={isChangeStatusModalOpen}
      onClose={() => setIsChangeStatusModalOpen(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "scroll",
        margin: "20px 0",
        width: "100%",
      }}
    >
      <div className="flex justify-center items-center flex-col bg-white p-8 sm:p-16 w-10/12 max-w-[700px] max-h-screen overflow-y-auto">
        {children}
      </div>
    </Modal>
  );
}
