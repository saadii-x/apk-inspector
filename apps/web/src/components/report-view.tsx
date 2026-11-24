"use client";

import { type CSSProperties, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Download,
  FileJson,
  Fingerprint,
  Info,
  Printer,
  ShieldAlert,
} from "lucide-react";

import { AnalysisReport, ComparisonReport, componentCount, formatBytes } from "@/lib/report";

const severityIcon = {
  critical: ShieldAlert,
  high: AlertTriangle,
  medium: AlertTriangle,
  low: Info,
  info: CheckCircle2,
};

function downloadJson(report: AnalysisReport) {
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${report.metadata.package_name}-apkinspector-report.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <div className="report-stat"><strong>{value}</strong><span>{label}</span></div>;
}

export function ReportView() {
  const serializedReport = useSyncExternalStore(
    () => () => undefined,
    () => sessionStorage.getItem("apkinspector:last-report"),
    () => null,
  );
  const report = useMemo(() => {
    if (!serializedReport) return null;
    try { return JSON.parse(serializedReport) as AnalysisReport; } catch { return null; }
  }, [serializedReport]);
  const serializedComparison = useSyncExternalStore(
    () => () => undefined,
    () => sessionStorage.getItem("apkinspector:last-comparison"),
    () => null,
  );
  const comparison = useMemo(() => {
    if (!serializedComparison) return null;
    try { return JSON.parse(serializedComparison) as ComparisonReport; } catch { return null; }
  }, [serializedComparison]);

  if (!report) {
    return (
      <main className="empty-report">
        <p className="brand">APKInspector</p>
        <h1>Analyze an APK to create a report.</h1>
        <p>No report in this session. Reports stay in your browser session and are not retained by the analysis service.</p>
        <Link className="primary-link" href="/">Return to analyzer</Link>
      </main>
    );
  }

  const certificates = report.metadata.signing.certificates;
  return (
    <main className="report-page">
      <header className="report-nav">
        <Link href="/" className="brand">APKInspector</Link>
        <div className="report-actions">
          <button type="button" onClick={() => downloadJson(report)}><FileJson aria-hidden="true" /> Export JSON</button>
          <button type="button" className="primary-action" onClick={() => window.print()}><Printer aria-hidden="true" /> Print or save PDF</button>
        </div>
      </header>

      <div className="report-container">
        <Link href="/" className="back-link"><ArrowLeft aria-hidden="true" /> New analysis</Link>
        <section className="report-hero">
          <div className="report-title">
            <h1>{report.metadata.app_name}</h1>
            <code>{report.metadata.package_name}</code>
            <p className="caption">Static analysis complete</p>
            <p>Analyzed {new Date(report.received_at).toLocaleString()}</p>
            <p>{formatBytes(report.size_bytes)}</p>
          </div>
          <div className={`report-score ${report.risk.rating}`}>
            <div className="score-ring" style={{ "--score": `${report.risk.score * 3.6}deg` } as CSSProperties}>
              <strong>{report.risk.score}</strong><span>/ 100</span>
            </div>
            <div><span>Risk rating</span><strong>{report.risk.rating}</strong></div>
          </div>
        </section>

        <section className="report-stats">
          <Stat label="Findings" value={report.risk.finding_count} />
          <Stat label="Permissions" value={report.metadata.permissions.length} />
          <Stat label="Components" value={componentCount(report)} />
          <Stat label="DEX files" value={report.archive.dex_files} />
          <Stat label="Native libraries" value={report.archive.native_libraries} />
        </section>

        {comparison && (
          <section className={`comparison-result ${comparison.possible_repackaging ? "repackaged" : "matched"}`}>
            <div>
              <h2>{comparison.possible_repackaging ? "Possible repackaging detected" : comparison.differences.identical_file ? "Files are identical" : "Package differences found"}</h2>
              <p className="caption">Trusted APK comparison</p>
              <dl className="comparison-facts">
                <div><dt>Certificate</dt><dd>{comparison.differences.signing_certificate_matches ? "matches" : "does not match"}</dd></div>
                <div><dt>Added permissions</dt><dd>{comparison.differences.added_permissions.length}</dd></div>
                <div><dt>Added components</dt><dd>{comparison.differences.added_components.length}</dd></div>
                <div><dt>Risk score</dt><dd>{comparison.differences.risk_score_delta >= 0 ? "+" : ""}{comparison.differences.risk_score_delta}</dd></div>
              </dl>
            </div>
          </section>
        )}

        <section className="report-block">
          <div className="report-block-heading"><div><h2>Security findings</h2><p className="caption">Prioritized evidence</p></div><span>{report.findings.length} total</span></div>
          {report.findings.length ? (
            <div className="report-findings">
              {report.findings.map((finding) => {
                const Icon = severityIcon[finding.severity];
                return (
                  <article className="report-finding" key={finding.rule_id}>
                    <div className={`finding-icon ${finding.severity}`}><Icon aria-hidden="true" /></div>
                    <div className="finding-content">
                      <div className="finding-title"><span className={`severity ${finding.severity}`}>{finding.severity}</span><span>{finding.category}</span><code>{finding.rule_id}</code></div>
                      <h3>{finding.title}</h3><p>{finding.description}</p>
                      <div className="finding-columns"><div><strong>Evidence</strong><ul>{finding.evidence.map((item) => <li key={item}>{item}</li>)}</ul></div><div><strong>Recommended action</strong><p>{finding.remediation}</p></div></div>
                    </div>
                    <span className="finding-score">+{finding.score}</span>
                  </article>
                );
              })}
            </div>
          ) : <div className="no-findings"><CheckCircle2 aria-hidden="true" /><div><strong>No scored findings</strong><p>No configured rule produced a risk finding. This does not guarantee the APK is safe.</p></div></div>}
        </section>

        <div className="report-grid">
          <section className="report-block compact-block">
            <div className="report-block-heading"><div><h2>Package identity</h2><p className="caption">Application</p></div></div>
            <dl className="detail-list">
              <div><dt>Version</dt><dd>{report.metadata.version_name ?? "Unknown"} ({report.metadata.version_code ?? "not recorded"})</dd></div>
              <div><dt>SDK range</dt><dd>{report.metadata.sdk.minimum ?? "not recorded"} to {report.metadata.sdk.target ?? "not recorded"}</dd></div>
              <div><dt>Main activity</dt><dd>{report.metadata.main_activity ?? "Not declared"}</dd></div>
              <div><dt>SHA-256</dt><dd className="hash-value">{report.sha256}</dd></div>
            </dl>
          </section>
          <section className="report-block compact-block">
            <div className="report-block-heading"><div><h2>Certificate identity</h2><p className="caption">Signing</p></div><Fingerprint aria-hidden="true" /></div>
            {certificates.length ? certificates.map((certificate) => (
              <dl className="detail-list" key={certificate.sha256}>
                <div><dt>Subject</dt><dd>{certificate.subject ?? "Subject unavailable"}</dd></div>
                <div><dt>SHA-256</dt><dd className="hash-value">{certificate.sha256}</dd></div>
                <div><dt>Schemes</dt><dd><ul className="scheme-list"><li>v1 {report.metadata.signing.signed_v1 ? "signed" : "absent"}</li><li>v2 {report.metadata.signing.signed_v2 ? "signed" : "absent"}</li><li>v3 {report.metadata.signing.signed_v3 ? "signed" : "absent"}</li></ul></dd></div>
              </dl>
            )) : <p className="muted-copy">No signing certificate was parsed.</p>}
          </section>
        </div>

        <section className="report-block compact-block indicator-block">
          <div className="report-block-heading"><div><h2>Endpoints, techniques, and native code</h2><p className="caption">Static code signals</p></div><Download aria-hidden="true" /></div>
          <div className="indicator-grid">
            <div><strong>Observed URLs</strong>{report.code.urls.length ? <ul>{report.code.urls.map((url) => <li key={url}>{url}</li>)}</ul> : <p>None found</p>}</div>
            <div><strong>Techniques</strong>{report.code.techniques.length ? <ul>{report.code.techniques.map((item) => <li key={item.technique}>{item.technique.replaceAll("_", " ")}</li>)}</ul> : <p>None found</p>}</div>
            <div><strong>Native libraries</strong>{report.code.native_libraries.length ? <ul>{report.code.native_libraries.map((library) => <li className="library-line" key={library.path}><span>{library.architecture}</span><span>{library.path.split("/").at(-1)}</span></li>)}</ul> : <p>None found</p>}</div>
          </div>
        </section>
        <p className="report-disclaimer">APKInspector performs static analysis and reports indicators, not a guarantee of safety. Review high-impact applications with additional dynamic testing and source-level assessment.</p>
      </div>
    </main>
  );
}
