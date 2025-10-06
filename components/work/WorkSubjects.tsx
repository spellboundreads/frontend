"use client";
import Chip from "@/components/Chip";
import { useState } from "react";

type WorkSubjects = {
  subjects: string[];
};

export default function WorkSubjects({ subjects }: WorkSubjects) {
  const defaultLength = 15;
  const [fullDisplay, setFullDisplay] = useState(false);

  return (
    <div className="hidden md:flex flex-col gap-2 px-2">
      <h2 className="font-semibold">Subjects</h2>
      <div className="flex flex-wrap gap-1">
        {(fullDisplay ? subjects : subjects.slice(0, defaultLength)).map(
          (subject) => (
            <Chip key={subject} href="#">
              {subject}
            </Chip>
          )
        )}
        {subjects.length > defaultLength && !fullDisplay && (
          <button
            className=" ml-3 uppercase font-semibold underline underline-offset-3 text-gray-800 shadow-2xl"
            onClick={() => setFullDisplay(true)}
          >
            See more
          </button>
        )}
      </div>
    </div>
  );
}
