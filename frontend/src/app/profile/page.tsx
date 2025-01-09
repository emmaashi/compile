"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  diagnosisDate: string;
  cancerType: string;
  birthday: string;
  notes: string;
  photo: string; // Can store a URL or base64 data URI
}

const cancerTypes = ["Lung Cancer", "Breast Cancer", "Colon Cancer", "Stomach Cancer", "Prostate Cancer"];

const initialPatients: Patient[] = [
  {
    id: 1,
    firstName: "An Min",
    lastName: "Zhai",
    cancerType: "Stomach Cancer",
    diagnosisDate: "2020-03-27",
    birthday: "1938-01-02",
    notes: "In-home hospice care. Nurse visits every other day.",
    photo: "/anmin.png",
  },
  {
    id: 2,
    firstName: "Emma",
    lastName: "Shi",
    cancerType: "Breast Cancer",
    diagnosisDate: "2023-09-05",
    birthday: "2006-04-04",
    notes: "Scheduled for surgery next week.",
    photo: "/emma.png",
  },
  {
    id: 3,
    firstName: "Gao Ping",
    lastName: "Xian",
    cancerType: "Lung Cancer",
    diagnosisDate: "2020-03-27",
    birthday: "1938-01-02",
    notes: "In-home hospice care. Nurse visits every other day.",
    photo: "/gao-ping.png",
  },
];

function ProfilePage() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isNewMember, setIsNewMember] = useState(false);

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsNewMember(false);
    setDialogOpen(true);
  };

  const handleAddNewMember = () => {
    setSelectedPatient({
      id: patients.length + 1,
      firstName: "",
      lastName: "",
      diagnosisDate: "",
      cancerType: "",
      birthday: "",
      notes: "",
      photo: "",
    });
    setIsNewMember(true);
    setDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (selectedPatient) {
      if (isNewMember) {
        setPatients([...patients, selectedPatient]);
      } else {
        setPatients(
          patients.map((patient) =>
            patient.id === selectedPatient.id ? selectedPatient : patient
          )
        );
      }
    }
    setDialogOpen(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (selectedPatient) {
          setSelectedPatient({ ...selectedPatient, photo: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-extrabold text-gray-800">Profile</h1>
      <h2>
        This section allows you to manage detailed profiles for family members
        affected by cancer. Each profile contains essential information to track
        their cancer journey and ensure coordinated care.
      </h2>
      <Separator />
      <Button className="mb-4" onClick={handleAddNewMember}>
        + New Member
      </Button>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {patients.map((patient) => (
          <Card
            key={patient.id}
            className="flex flex-col items-center p-4 shadow hover:shadow-md cursor-pointer"
            onClick={() => handlePatientClick(patient)}
          >
            <CardHeader className="flex justify-center items-center">
              <Image
                src={patient.photo || "/placeholder.png"}
                alt={`${patient.firstName} ${patient.lastName}`}
                className="w-36 h-36 rounded-full"
                width={100}
                height={100}
              />
            </CardHeader>
            <CardContent className="text-center">
              <span className="font-medium">{`${patient.firstName} ${patient.lastName}`}</span>
              <br />
              <span className="text-sm text-gray-500">{`${patient.birthday}`}</span>
              <br />
              <Badge variant="outline">{`${patient.cancerType}`}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedPatient && (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg overflow-auto">
            <DialogHeader>
              <DialogTitle>
                {isNewMember ? "Add New Member" : "Edit Patient Details"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <Label htmlFor="cancerType">Cancer Type</Label>
                <Select
                  value={selectedPatient.cancerType}
                  onValueChange={(value) =>
                    setSelectedPatient({ ...selectedPatient, cancerType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cancer type" />
                  </SelectTrigger>
                  <SelectContent>
                    {cancerTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="diagnosisDate">Diagnosis Date</Label>
                <Input
                  id="diagnosisDate"
                  type="date"
                  value={selectedPatient.diagnosisDate}
                  onChange={(e) =>
                    setSelectedPatient({ ...selectedPatient, diagnosisDate: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="birthday">Birthday</Label>
                <Input
                  id="birthday"
                  type="date"
                  value={selectedPatient.birthday}
                  onChange={(e) =>
                    setSelectedPatient({ ...selectedPatient, birthday: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={selectedPatient.notes}
                  onChange={(e) =>
                    setSelectedPatient({ ...selectedPatient, notes: e.target.value })
                  }
                  placeholder="Enter patient notes here..."
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="photo"><b>Upload Photo</b></Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>
                {isNewMember ? "Add Member" : "Save Changes"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default ProfilePage;
