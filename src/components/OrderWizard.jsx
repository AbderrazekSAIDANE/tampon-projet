export default function OrderWizard() {
  const [step, setStep] = useState(1);
  const [categorie, setCategorie] = useState("");
  const [filesUploaded, setFilesUploaded] = useState({ idFile: null, rcFile: null });

  return (
    <>
      {step === 1 && (
        <ShapeSelector
          onSelect={(cat) => {
            setCategorie(cat);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <FileUploader
          onUploadComplete={(files) => {
            setFilesUploaded(files);
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <PersonnalisationPage
          categorie={categorie}
          justificatifs={filesUploaded}
        />
      )}
    </>
  );
}
