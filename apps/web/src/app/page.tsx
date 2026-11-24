import { UploadPanel } from "@/components/upload-panel";

const inspectionAreas = [
  {
    tag: "Manifest",
    title: "Manifest security",
    text: "Review permissions, exported components, backup settings, debug mode, cleartext traffic, and SDK targets.",
  },
  {
    tag: "Identity",
    title: "Signing identity",
    text: "Inspect signing certificates and compare fingerprints with a trusted copy to uncover possible repackaging.",
  },
  {
    tag: "Code",
    title: "Code indicators",
    text: "Surface dynamic loading, suspicious endpoints, embedded secrets, persistence hooks, overlays, and native code.",
  },
];

const reportRows = [
  { severity: "High", finding: "Debug mode enabled", area: "Manifest", tone: "danger" },
  { severity: "Medium", finding: "Cleartext traffic permitted", area: "Network", tone: "warning" },
  { severity: "Info", finding: "Certificate fingerprint recorded", area: "Signing", tone: "info" },
];

const workflow = [
  {
    label: "Bounded intake",
    title: "Validate the package",
    text: "File type, archive paths, entry counts, and expanded size are checked before inspection begins.",
  },
  {
    label: "Static inspection",
    title: "Correlate the evidence",
    text: "Manifest, certificate, DEX, endpoint, and native-library signals are evaluated without executing code.",
  },
  {
    label: "Explainable result",
    title: "Review and export",
    text: "Each finding includes its evidence, impact, score contribution, and a practical remediation.",
  },
];

function SampleReport() {
  return (
    <div className="report-preview" aria-label="Illustrative security report preview">
      <div className="preview-head">
        <div>
          <strong>com.example.demo</strong>
          <span className="preview-caption">Illustrative report</span>
        </div>
        <div className="score-reading">
          <span className="reading">62</span>
          <small>Risk score</small>
        </div>
      </div>
      <div className="preview-summary">
        <span><b>3</b> findings</span>
        <span><b>34</b> permissions</span>
        <span><b>8</b> components</span>
      </div>
      <div className="finding-list">
        {reportRows.map((row) => (
          <div className="finding-row" key={row.finding}>
            <span className={`severity ${row.tone}`}>{row.severity}</span>
            <strong>{row.finding}</strong>
            <span>{row.area}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="main-content">
      <nav className="site-nav" aria-label="Primary navigation">
        <div className="container nav-row">
          <div className="nav-links">
            <a href="#capabilities">Capabilities</a>
            <a href="#workflow">Workflow</a>
            <a href="#report">Report</a>
            <a href="#privacy">Privacy</a>
          </div>
          <a className="brand" href="#top" aria-label="APKInspector home">
            APKInspector
          </a>
          <a className="nav-action" href="https://github.com/RaoHaris535/Apk-Inspector" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 className="display-s">
              See what is inside an APK
              <br />
              before it reaches your phone.
            </h1>
            <p className="lead">
              APKInspector translates Android manifests, signatures, and code
              indicators into a clear, explainable security report.
            </p>
            <UploadPanel />
          </div>
          <SampleReport />
        </div>
      </section>

      <section className="section capabilities" id="capabilities">
        <div className="container">
          <div className="head-block">
            <h2>One upload.<br />Multiple layers of evidence.</h2>
            <p className="lead">Static Android security analysis. No installation. No execution. Just evidence. Complete inspection. Every result connects a technical signal to its security impact and a practical remediation.</p>
          </div>
          <div className="capability-rows">
            {inspectionAreas.map(({ tag, title, text }) => (
              <article className="capability-row" key={title}>
                <p>{tag}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="coverage-line">Static analysis only. Transparent scoring. Manifest, permissions, certificates, DEX code, and native libraries.</p>
        </div>
      </section>

      <section className="section workflow-section" id="workflow">
        <div className="container">
          <div className="head-block">
            <h2>A careful path <br />through untrusted input.</h2>
            <p className="lead">From package to evidence. The analyzer keeps every stage bounded, traceable, and understandable.</p>
          </div>
          <ol className="stages">
            {workflow.map(({ label, title, text }) => (
              <li className="stage" key={title}>
                <h3>{title}</h3>
                <p className="stage-label">{label}</p>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section report-section" id="report">
        <div className="container report-layout">
          <div className="head-block">
            <h2>A score you can<br />actually understand.</h2>
            <p className="lead">Evidence, not alarms.</p>
            <p>
              Findings are grouped by severity and include the observed evidence,
              affected component, risk explanation, and recommended action. The final
              score is a transparent sum of those findings, not a black box.
            </p>
            <ul className="check-list">
              <li>Prioritized security findings</li>
              <li>Certificate and package identity</li>
              <li>Downloadable analysis report</li>
            </ul>
          </div>
          <SampleReport />
        </div>
      </section>

      <section className="section privacy-section" id="privacy">
        <div className="container statement">
          <h2>Your APK is analyzed, then removed.</h2>
          <p className="lead">Built for hostile input.</p>
          <p>
            Uploaded files are handled in a temporary workspace, never executed,
            and deleted when analysis completes. Archive size and path protections
            keep the service bounded.
          </p>
          <a className="btn" href="#top">Upload your APK</a>
        </div>
      </section>

      <footer>
        <div className="container footer-statement">
          <p className="footer-line">Defensive Android analysis for education and security review.</p>
          <div className="footer-meta">
            <a className="brand footer-brand" href="#top">APKInspector</a>
            <p className="footer-links">
              <a href="https://apk-inspector-api.onrender.com/api/docs" target="_blank" rel="noreferrer">API docs</a>
              <a href="https://github.com/RaoHaris535/Apk-Inspector" target="_blank" rel="noreferrer">Source</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
