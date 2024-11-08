import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

const ReportIssueModal = ({ open, onClose }) => {
  const [selectedReport, setSelectedReport] = useState("");
  const [otherIssue, setOtherIssue] = useState(""); // State for the "Other" issue input

  const handleReport = () => {
    // Show success toast if a report is selected or "Other" is filled
    toast.success("Report Submitted Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });

    setTimeout(() => {
      onClose(); // Close the modal after the toast is shown
    }, 1000);
  };

  const handleChange = (event) => {
    setSelectedReport(event.target.value);
  };

  const handleOtherChange = (event) => {
    setOtherIssue(event.target.value);
  };

  const violetColor = "rgb(133, 93, 203)";

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="report-issue-modal-title"
        aria-describedby="report-issue-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "black", // Black background
            color: "white", // White text
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            id="report-issue-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: violetColor }}
          >
            Report
          </Typography>
          <RadioGroup
            aria-labelledby="report-issue-options"
            value={selectedReport}
            onChange={handleChange}
            sx={{ mt: 2 }}
          >
            <FormControlLabel
              value="Issue 1"
              control={
                <Radio
                  sx={{
                    color: violetColor,
                    "&.Mui-checked": { color: violetColor },
                  }}
                />
              }
              label="Question is wrong"
            />
            <FormControlLabel
              value="Issue 2"
              control={
                <Radio
                  sx={{
                    color: violetColor,
                    "&.Mui-checked": { color: violetColor },
                  }}
                />
              }
              label="Answer is wrong"
            />
            <FormControlLabel
              value="Issue 3"
              control={
                <Radio
                  sx={{
                    color: violetColor,
                    "&.Mui-checked": { color: violetColor },
                  }}
                />
              }
              label="Spelling mistake"
            />
            <FormControlLabel
              value="Issue 4"
              control={
                <Radio
                  sx={{
                    color: violetColor,
                    "&.Mui-checked": { color: violetColor },
                  }}
                />
              }
              label="Subject is different"
            />
            <FormControlLabel
              value="Issue 5"
              control={
                <Radio
                  sx={{
                    color: violetColor,
                    "&.Mui-checked": { color: violetColor },
                  }}
                />
              }
              label="Other"
            />
          </RadioGroup>

          {/* Show input box if "Other" is selected */}
          {selectedReport === "Issue 5" && (
            <TextField
              placeholder="Enter your issue"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={otherIssue}
              onChange={handleOtherChange}
              sx={{
                mt: 2,
                backgroundColor: "white", // White background
                color: "black", // Black text color
                "& .MuiInputBase-root": {
                  color: "black", // Ensure text is black
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: violetColor, // Violet border
                  },
                  "&:hover fieldset": {
                    borderColor: violetColor, // Violet border on hover
                  },
                },
              }}
            />
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              onClick={() => {
                setSelectedReport(""); // Reset the selection on cancel
                setOtherIssue(""); // Reset the "Other" input
                onClose(); // Close the modal immediately
              }}
              variant="outlined"
              sx={{
                color: violetColor,
                borderColor: violetColor,
                mr: 1,
              }}
            >
              Cancel
            </Button>
            <button
              onClick={handleReport}
              className={` px-6 py-2 rounded-lg text-white transition-colors ${
                !selectedReport && !otherIssue
                  ? "bg-violet-600 opacity-50 cursor-not-allowed"
                  : "bg-violet-700 hover:bg-violet-800 cursor-pointer"
              }`}
              disabled={!selectedReport && !otherIssue} // Disable the button if no report or issue is selected
            >
              Report
            </button>
          </Box>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
};

// Prop validation for ReportIssueModal
ReportIssueModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReportIssueModal;
