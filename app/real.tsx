"use client";
import { Button } from "@/app/c/button";
import { Input, Textarea } from "@/app/c/input";
import { Line } from "@/app/c/line";
import { LocalState } from "@/app/c/localstate";
import { Modal } from "@/app/c/modal";
import { Paper } from "@/app/c/paper";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { twJoin, twMerge } from "tailwind-merge";

type Preset = [string, string[]];

export default function () {
  let [presets, setPresets] = useLocalStorage<Preset[]>("myPresets", []);
  let [activePreset, setActivePreset] = useState<Preset | null>(null);
  let [groups, setGroups] = useState(1);

  function getRandomGroups(members: string[]) {
    members = members.filter(Boolean);

    function shuffleArray(array: string[]) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    let shuffledArray = shuffleArray(members);
    let res = Array.from<unknown, string[]>({ length: groups }, () => []);

    shuffledArray.forEach((item, index) => {
      let key = index % groups;
      res[key].push(item);
    });

    return res;
  }

  useEffect(() => {
    setGroups((groups) => Math.min(groups, activePreset?.[1].length ?? 1));
  }, [activePreset]);

  return (
    <main className="w-screen min-h-screen p-4 grid place-items-center">
      <div className="max-w-[95vw] w-full h-full grid grid-cols-[auto_1fr] gap-x-4">
        <Paper className="p-4 w-fit h-fit">
          <p className="leading-tight font-medium">Presets</p>
          <p className="text-sm font-light text-subtle mb-4">
            Click to add or remove presets
          </p>
          <ul>
            {presets.map(([name, members], i) => (
              <LocalState key={`${name}, ${i}`} initialState={false}>
                {(hovering, setHovering) => (
                  <li
                    className="flex items-center p-2 gap-x-2 border-t border-faint relative"
                    onMouseEnter={setHovering.bind(null, true)}
                    onMouseLeave={setHovering.bind(null, false)}
                  >
                    <Button
                      variant="text"
                      onClick={setActivePreset.bind(null, [name, members])}
                      className={twJoin(
                        activePreset?.[0] == name && "text-primary"
                      )}
                    >
                      {name}
                    </Button>
                    <Line className="flex-1 mr-1 min-w-4" />
                    <p className="text-xs font-normal leading-none text-subtle max-w-24 text-ellipsis whitespace-nowrap overflow-hidden">
                      {members.join(", ")}
                    </p>
                    <div
                      className={twMerge(
                        "flex absolute right-0 backdrop-blur-lg rounded-full duration-300",
                        !hovering && "hidden"
                      )}
                    >
                      <LocalState initialState={false}>
                        {(state, update) => (
                          <>
                            <Button
                              onClick={update.bind(null, true)}
                              variant="text"
                              className="size-8 rounded-full"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                              </svg>
                            </Button>
                            <Modal open={state} closeModal={update}>
                              <form
                                className="grid gap-4"
                                onSubmit={(e) => {
                                  e.preventDefault();

                                  let data = new FormData(e.currentTarget);

                                  let [newName, members] = [
                                    data.get("name") as string,
                                    (data.get("members") as string).split("\n"),
                                  ];

                                  setActivePreset([newName, members]);
                                  setPresets((presets) => {
                                    let removedIndex = presets.findIndex(
                                      ([existingName]) => existingName == name
                                    );

                                    presets.splice(removedIndex, 1);

                                    return [...presets, [newName, members]];
                                  });
                                  update(false);
                                }}
                              >
                                <div className="flex flex-col">
                                  <label
                                    className="text-left text-sm"
                                    htmlFor="name"
                                  >
                                    Name
                                  </label>
                                  <Input
                                    required
                                    defaultValue={name}
                                    id="name"
                                    type="text"
                                    name="name"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <label
                                    className="text-left text-sm"
                                    htmlFor="members"
                                  >
                                    Members
                                  </label>
                                  <Textarea
                                    className="max-w-96 max-h-96 min-h-20"
                                    style={{ fieldSizing: "content" } as any}
                                    defaultValue={members.join("\n")}
                                    required
                                    id="members"
                                    name="members"
                                  />
                                </div>
                                <Button className="mt-8" type="submit">
                                  Submit
                                </Button>
                              </form>
                            </Modal>
                          </>
                        )}
                      </LocalState>
                      <Button
                        onClick={() => {
                          setPresets((presets) => {
                            let removedIndex = presets.findIndex(
                              ([existingName]) => existingName == name
                            );

                            presets.splice(removedIndex, 1);

                            console.log(presets);

                            return [...presets];
                          });
                        }}
                        variant="text"
                        className="size-8 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </div>
                  </li>
                )}
              </LocalState>
            ))}
          </ul>
          <LocalState initialState={false}>
            {(state, update) => (
              <>
                <Button
                  onClick={update.bind(null, true)}
                  variant="seethru"
                  className="size-8 rounded-full hover:rotate-180 mx-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </Button>
                <Modal open={state} closeModal={update}>
                  <form
                    className="grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();

                      let data = new FormData(e.currentTarget);

                      let [name, members] = [
                        data.get("name") as string,
                        (data.get("members") as string).split("\n"),
                      ];

                      setActivePreset([name, members]);
                      setPresets((presets) => [...presets, [name, members]]);
                      update(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <label className="text-left text-sm" htmlFor="name">
                        Name
                      </label>
                      <Input required id="name" type="text" name="name" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-left text-sm" htmlFor="members">
                        Members
                      </label>
                      <Textarea
                        className="max-w-96 max-h-96 min-h-20"
                        style={{ fieldSizing: "content" } as any}
                        required
                        id="members"
                        name="members"
                      />
                    </div>
                    <Button className="mt-8" type="submit">
                      Submit
                    </Button>
                  </form>
                </Modal>
              </>
            )}
          </LocalState>
        </Paper>
        <div>
          <label className="text-left text-sm" htmlFor="groups">
            # of Groups:
          </label>
          <Input
            name="groups"
            type="number"
            min="1"
            max={activePreset?.[1].length ?? 1}
            className="w-[48px] ml-4"
            value={`${groups}`}
            onChange={(e) => setGroups(Number(e.currentTarget.value) || 1)}
          />
          {activePreset && (
            <div className="flex flex-wrap gap-4 m-4">
              {getRandomGroups(activePreset[1]).map((group, index) => (
                <Paper key={index} className="p-4 w-40 overflow-hidden">
                  <p
                    className="text-center"
                    style={{ color: `hsl(${index * 20} 70 70)` }}
                  >
                    {index}
                  </p>
                  <Line className="my-4" />
                  {group.map((value, index) => (
                    <p
                      key={index}
                      className={twJoin(
                        value.toLowerCase().includes("gavin")
                          ? "text-orange-500 font-extrabold"
                          : "text-subtle",
                        "mb-1"
                      )}
                    >
                      {`${value}`}
                    </p>
                  ))}
                </Paper>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
