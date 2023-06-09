export type PbProps = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
};

export type PbAuthRecordProps = PbProps & {
  email: string;
  emailVisibility: string;
  username: string;
  verified: boolean;
};
