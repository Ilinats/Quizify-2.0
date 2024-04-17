let folderName: string | null = null;

export const setFolderName = (name: string | null) => {
  folderName = name;
};

export const getFolderName = () => folderName;
