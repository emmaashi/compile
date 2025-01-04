"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MaskedText from "./components/masked-text";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"; // ShadCN UI Card components
import Image from "next/image";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  photo: string;
}

// Temp sample patients
const patients: Patient[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    age: 35,
    photo: "/images/john.jpg",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "securePass456",
    age: 28,
    photo: "/emma.png",
  },
];

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
              <br></br>
              <span className="text-sm text-gray-500">{`Age: ${patient.age}`}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedPatient && (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md space-y-6">
            <DialogHeader>
              <DialogTitle>Edit Patient Details</DialogTitle>
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
                <Label htmlFor="email"><b>Email</b></Label>
                <Input
                  id="email"
                  type="email"
                  value={selectedPatient.email}
                  onChange={(e) =>
                    setSelectedPatient({ ...selectedPatient, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="password"><b>Password</b></Label>
                <MaskedText
                  value={selectedPatient.password}
                  onChange={(value) =>
                    setSelectedPatient({ ...selectedPatient, password: value })
                  }
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