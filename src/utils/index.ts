import { Participants, DialogValues } from "@/interfaces";

export const initDialogValues: DialogValues = {
  id: 0,
  title: "",
  date: null,
  participants: [],
  currentName: "",
  currentPrice: "",
};

export const participantsDataCheckeds = (
  participants: Participants[],
  checked: Array<number>
): Participants[] =>
  participants.map((e) => {
    return {
      ...e,
      paid: checked.includes(e.id),
    };
  });
