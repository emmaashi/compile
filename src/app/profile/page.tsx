"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MaskedText from "./components/masked-text"

// Define the patient type
interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  photo: string;
}

// Sample patient data
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
    photo: "/images/jane.jpg",
  },
];

function ProfilePage() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (selectedPatient) {
      console.log("Updated patient details:", selectedPatient);
    }
    setDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Patients</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {patients.map((patient) => (
          <Button
            key={patient.id}
            className="flex flex-col items-center rounded-lg p-4 shadow hover:shadow-md"
            onClick={() => handlePatientClick(patient)}
          >
            <img
              src={patient.photo}
              alt={`${patient.firstName} ${patient.lastName}`}
              className="w-16 h-16 rounded-full mb-2"
            />
            <span className="font-medium">{`${patient.firstName} ${patient.lastName}`}</span>
            <span className="text-sm text-gray-500">{`Age: ${patient.age}`}</span>
          </Button>
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
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={selectedPatient.firstName}
                  onChange={(e) =>
                    setSelectedPatient({ ...selectedPatient, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={selectedPatient.lastName}
                  onChange={(e) =>
                    setSelectedPatient({ ...selectedPatient, lastName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
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
                <Label htmlFor="password">Password</Label>
                <MaskedText
                  value={selectedPatient.password}
                  onChange={(value) =>
                    setSelectedPatient({ ...selectedPatient, password: value })
                  }
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