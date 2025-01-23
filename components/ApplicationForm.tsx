"use client"
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface FormApplicationProps {
  onSubmit: (data: { kajasepId: string; applicantId: string; message?: string }) => void;
  isOpen: boolean;
  onClose: () => void;
}

const FormApplication: React.FC<FormApplicationProps> = ({ onSubmit, isOpen, onClose }) => {
  const [kajasepId, setKajasepId] = useState<string>("");
  const [applicantId, setApplicantId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ kajasepId, applicantId, message });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-2 border-white bg-gradient-to-br from-[#FF5F6D] to-[#FFC371] p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold text-white mb-4">Form Application</h2>

          {/* Kajasep ID */}
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">Kajasep ID</label>
            <Input
              type="text"
              value={kajasepId}
              onChange={(e) => setKajasepId(e.target.value)}
              placeholder="Enter Kajasep ID"
              required
            />
          </div>

          {/* Applicant ID */}
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">Applicant ID</label>
            <Input
              type="text"
              value={applicantId}
              onChange={(e) => setApplicantId(e.target.value)}
              placeholder="Enter Applicant ID"
              required
            />
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message (optional)"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormApplication;