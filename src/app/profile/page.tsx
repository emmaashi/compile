"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import Image from "next/image";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  cancerType: string;
  birthday: string; // Use a date string format (YYYY-MM-DD)
  notes: string;
  photo: string;
}

// Temp sample patients
const patients: Patient[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    cancerType: "Lung Cancer",
    birthday: "1987-05-15",
    notes: "Undergoing treatment with chemotherapy.",
    photo: "/images/john.jpg",
  },
  {
    id: 2,
    firstName: "Emma",
    lastName: "Shi",
    cancerType: "Breast Cancer",
    birthday: "2006-04-05",
    notes: "Scheduled for surgery next week.",
    photo: "/emma.png",
  },
];

const cancerTypes = ["Lung Cancer", "Breast Cancer", "Colon Cancer", "Stomach Cancer", "Prostate Cancer"];

function ProfilePage() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setNewPhoto(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    if (selectedPatient) {
      const updatedPatient = {
        ...selectedPatient,
        photo: photoPreview || selectedPatient.photo,
      };
      console.log("Updated patient details:", updatedPatient);
    }
    setDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Patients</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {patients.map((patient) => (
          <Card
            key={patient.id}
            className="flex flex-col items-center p-4 shadow hover:shadow-md cursor-pointer"
            onClick={() => handlePatientClick(patient)}
          >
            <CardHeader className="flex justify-center items-center">
              <Image
                src={patient.photo}
                alt={`${patient.firstName} ${patient.lastName}`}
                className="w-24 h-24 rounded-full"
                width={96}
                height={96}
              />
            </CardHeader>
            <CardContent className="text-center">
              <span className="font-medium">{`${patient.firstName} ${patient.lastName}`}</span>
              <br />
              <span className="text-sm text-gray-500">
                {`${new Date(patient.birthday).toLocaleDateString()}`}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedPatient && (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md space-y-6">
            <DialogHeader>
              <DialogTitle>Edit patient details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName"><b>First Name</b></Label>
                <Input
                  id="firstName"
                  value={selectedPatient.firstName}
                  onChange={(e) =>
                    setSelectedPatient({ ...selectedPatient, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="lastName"><b>Last Name</b></Label>
                <Input
                  id="lastName"
                  value={selectedPatient.lastName}
                  onChange={(e) =>
                    setSelectedPatient({ ...selectedPatient, lastName: e.target.value })
                  }
                />
              </div>
              <div>
              <Label htmlFor="cancerType"><b>Cancer Type</b></Label>
              <Select
                value={selectedPatient.cancerType}
                onValueChange={(value) =>
                  setSelectedPatient({ ...selectedPatient, cancerType: value })
                }
              >
                <SelectTrigger id="cancerType">
                  <SelectValue placeholder="Select cancer type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {cancerTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
              <div>
                <Label htmlFor="notes"><b>Notes</b></Label>
                <Textarea
                  id="notes"
                  value={selectedPatient.notes}
                  onChange={(e) =>
                    setSelectedPatient({ ...selectedPatient, notes: e.target.value })
                  }
                  placeholder="Enter patient notes here..."
                />
              </div>
              <div>
                <Label htmlFor="photo"><b>Patient Photo</b></Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-2"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default ProfilePage;