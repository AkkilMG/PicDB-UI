"use client";


import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MdClose, MdReportProblem } from "react-icons/md"
import { useEffect, useState } from "react";
import { closeReport, getReport } from "@/lib/report";
import ReportPopup from "@/components/pop/report";

export function ReportsList() {
  const [reports, setReports] = useState<any[]>([])
  const fetchReport = async () => {
    try {
      var report = await getReport();
      if (report.success) {
          setReports(report.reports)
      } else {
        console.log("Failed or no reports.")
      }
    } catch (error) {
      console.log("Error fetch report:", error)
      alert("Failed to fetch report. Please try again in error.")
    }
  }
  
  useEffect(() => {
      fetchReport();
  }, [])

  const closeReportById = async (reportId: string) => {
      try {
          var close = await closeReport(reportId)
          if (close.success) {
              alert("Report closed successfully")
              setReports(reports.filter(report => report._id !== reportId))
              setReportData({});
              setReportOpen(false)
          } else {
              alert("Failed to close report. Please try again.")
          }
      } catch (error) {
          console.log("Error closing report:", error)
          alert("Failed to close report. Please try again in error.")
      }
  }

  
  const [reportOpen, setReportOpen] = useState(false);
  const [reportData, setReportData] = useState<any>({});
  const handleReportClick = (id: string) => {
    const report = reports.find((report) => report._id === id);
    if (!report) {
      console.log("report not found for ID:", id);
      return;
    }
    setReportData(report);
    setReportOpen(true)
  }
  const handleReportClose = () => {
    setReportOpen(false)
  }

  
  return (
    <>
    {reportData && reportOpen && <ReportPopup isOpen={reportOpen} onClose={handleReportClose} data={reportData} closeReportById={closeReportById} /> }
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contact</TableHead>
          <TableHead>Report Reason</TableHead>
          <TableHead className="text-right pr-5">Link</TableHead>
          <TableHead className="text-right pr-5">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="pb-4">
        {reports.length > 0 ? reports.map((report: any, index: number) => (
          <TableRow key={index} onClick={(e) => handleReportClick(report._id)}>
            <TableCell className="font-medium"><a draggable={false}className="text-black" href={report.contact}>{report.contact}</a></TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <MdReportProblem className="h-4 w-4 text-muted-foreground" />
                {report.report}
              </div>
            </TableCell>
            <TableCell>
            <a draggable={false}href={report.link} className="flex items-center gap-2 justify-end"><ExternalLink className="h-4 w-4 text-muted-foreground" />Link</a>
            </TableCell>
            <TableCell className="text-right">
              <Button onClick={(e) => closeReportById(report._id)} variant="ghost" size="sm" className="border border-red-500 bg-red-50 text-red-500 hover:bg-red-100">
                <MdClose className="h-4 w-4" />
                Close
              </Button>
            </TableCell>
          </TableRow>
        )) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-base pt-10">
                No reports found.
              </TableCell>
            </TableRow>
        )}
      </TableBody>
    </Table>
    </>
  )
}
