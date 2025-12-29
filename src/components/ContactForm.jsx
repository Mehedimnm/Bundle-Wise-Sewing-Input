import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBriefcase, FiHash, FiChevronDown, FiCheck, FiDatabase, FiLoader, FiAlertTriangle, FiPrinter, FiArrowLeft, FiCheckCircle } from "react-icons/fi";

const AliveBackground = () => {
  const particles = Array.from({ length: 20 });
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0f172a]">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      {particles.map((_, i) => (
        <motion.div key={i} className="absolute bg-cyan-500/20 rounded-full blur-sm" initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, scale: Math.random() * 0.5 + 0.5, opacity: 0.1 }} animate={{ y: [null, Math.random() * -100], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }} style={{ width: Math.random() * 80 + 'px', height: Math.random() * 80 + 'px' }} />
      ))}
    </div>
  );
};

const FullPageLoader = ({ status }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-xl">
    <div className="relative">
      <motion.div className="w-24 h-24 border-4 border-cyan-500/30 rounded-full" animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
      <motion.div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-cyan-400 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
      <div className="absolute inset-0 flex items-center justify-center"><FiDatabase className="text-3xl text-cyan-400 animate-pulse" /></div>
    </div>
    <h2 className="mt-8 text-xl font-bold text-white tracking-widest uppercase">{status}</h2>
  </motion.div>
);

const ResultDashboard = ({ data, onReset }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-emerald-400 to-green-500"></div>
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50"><FiCheckCircle className="text-4xl text-green-400" /></div>
      <h2 className="text-2xl md:text-3xl font-bold text-white">Success!</h2>
      <p className="text-slate-400 text-sm mt-2">Bundle data saved successfully</p>
    </div>
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-8">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-700/50">
        <span className="text-slate-400 text-sm">Challan No</span>
        <span className="text-white font-mono font-bold text-lg">{data.challan_no}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-slate-400 text-sm">System ID</span>
        <span className="text-cyan-400 font-mono font-bold">{data.system_id}</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-8">
      <a href={data.report1_url} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl transition-all"><FiPrinter className="text-2xl text-purple-400 mb-2" /><span className="text-xs font-bold text-slate-300 uppercase">Call List</span></a>
      <a href={data.report2_url} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl transition-all"><FiPrinter className="text-2xl text-cyan-400 mb-2" /><span className="text-xs font-bold text-slate-300 uppercase">Challan</span></a>
    </div>
    <button onClick={onReset} className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"><FiArrowLeft /> Input Another</button>
  </motion.div>
);

const CustomDropdown = ({ icon: Icon, label, selected, setSelected, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative mb-6 z-50">
      <div className="absolute top-[-8px] left-3 bg-cyan-950 px-2 py-0.5 text-[9px] md:text-[10px] font-bold text-cyan-400 z-10 uppercase tracking-widest border border-cyan-900 rounded-md">{label}</div>
      <div onClick={() => setIsOpen(!isOpen)} className={`w-full bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-lg h-[55px] md:h-[70px] flex items-center justify-between px-4 md:px-5 cursor-pointer transition-all duration-300 ${isOpen ? "border-cyan-500" : ""}`}>
        <div className="flex items-center gap-3 md:gap-6 w-full overflow-hidden">
          <div className={`text-xl md:text-2xl p-1.5 md:p-2 rounded-md ${selected ? "text-cyan-400 bg-cyan-950" : "text-slate-500 bg-slate-800"}`}><Icon /></div>
          <span className={`text-sm md:text-lg font-medium truncate ${selected ? "text-white" : "text-slate-400"}`}>{selected || "Select Company"}</span>
        </div>
        <FiChevronDown size={20} className={`transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-cyan-400" : "text-slate-500"}`} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute top-full left-0 w-full bg-[#0f172a] border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-50 mt-1 max-h-[250px] overflow-y-auto">
            {options.map((option, index) => (
              <div key={index} onClick={() => { setSelected(option); setIsOpen(false); }} className={`flex items-center justify-between px-4 py-3 md:px-6 md:py-4 cursor-pointer border-b border-slate-800 last:border-none hover:bg-slate-800 ${selected === option ? "text-cyan-400 font-semibold" : "text-slate-400"}`}>
                <span className="text-xs md:text-sm">{option}</span>
                {selected === option && <FiCheck className="shrink-0" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InputField = ({ icon: Icon, label, type, id, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative mb-6 z-0">
       <div className="absolute top-[-8px] left-3 bg-cyan-950 px-2 py-0.5 text-[9px] md:text-[10px] font-bold text-cyan-400 z-10 uppercase tracking-widest border border-cyan-900 rounded-md">{label}</div>
      <div className={`relative flex items-center w-full h-[55px] md:h-[70px] bg-slate-900/60 backdrop-blur-md border rounded-lg transition-all duration-300 ${isFocused ? "border-cyan-500 ring-2 ring-cyan-500/20" : "border-slate-700"}`}>
        <div className={`pl-4 md:pl-5 text-xl md:text-2xl ${isFocused || value ? "text-cyan-400" : "text-slate-500"}`}><Icon /></div>
        <input type={type} id={id} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className="w-full h-full pl-3 md:pl-6 pr-4 text-white text-sm md:text-lg font-medium outline-none bg-transparent placeholder-transparent" />
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [challanNo, setChallanNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [usingBackup, setUsingBackup] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  const isSessionActive = useRef(false);
  const ERP_USER = import.meta.env.VITE_ERP_USER;
  const ERP_PASS = import.meta.env.VITE_ERP_PASS;
  const MAIN_URL = "/erp";
  const BACKUP_URL_PROXY = "/erp-backup";
  const currentBaseUrl = useRef(MAIN_URL);
  
  const companyList = ["COTTON CLUB BD LTD", "COTTON CLOTHING BD LTD", "COTTON CLOUT BD LTD", "TROPICAL KNITRX LTD"];

  const toFormData = (obj) => {
    const formData = new URLSearchParams();
    for (const key in obj) formData.append(key, obj[key]);
    return formData;
  };

  const performLogin = async () => {
    const reqOptions = { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, credentials: 'include' };
    await fetch(`${currentBaseUrl.current}/login.php`, { ...reqOptions, body: toFormData({ txt_userid: ERP_USER, txt_password: ERP_PASS, submit: 'Login' }) });
    
    await Promise.all([
      fetch(`${currentBaseUrl.current}/tools/valid_user_action.php?menuid=724`, { credentials: 'include' }),
      fetch(`${currentBaseUrl.current}/includes/common_functions_for_js.php?data=724_7_406&action=create_menu_session`, { credentials: 'include' })
    ]);
    isSessionActive.current = true;
  };

  const handleDirectSubmission = async (e, isRetry = false) => {
    if(e) e.preventDefault();
    if (!selectedCompany) { setApiError("Please select a company!"); return; }
    if (!challanNo) { setApiError("Please enter challan no!"); return; }

    if(!isRetry) { setApiError(""); setApiResponse(null); setIsLoading(true); }
    if(usingBackup) setStatusMsg("USING BACKUP SERVER...");
    else if(!isSessionActive.current) setStatusMsg("AUTHENTICATING...");
    else if(isRetry) setStatusMsg("RE-CONNECTING...");
    else setStatusMsg("PROCESSING...");

    let cbo_logic = "1";
    if (selectedCompany === "COTTON CLUB BD LTD") cbo_logic = "1";
    else if (selectedCompany === "COTTON CLOTHING BD LTD") cbo_logic = "2";
    else if (selectedCompany === "TROPICAL KNITRX LTD") cbo_logic = "3";
    else if (selectedCompany === "COTTON CLOUT BD LTD") cbo_logic = "4";

    try {
      if (!isSessionActive.current && !isRetry) await performLogin();

      const ctrlUrl = `${currentBaseUrl.current}/production/requires/bundle_wise_cutting_delevar_to_input_controller.php`;
      
      const searchRes = await fetch(`${ctrlUrl}?data=${challanNo}_0__${cbo_logic}_2__1_&action=create_challan_search_list_view`, { credentials: 'include' });
      const searchText = await searchRes.text();

      if (searchText.includes("txt_userid") || searchText.includes("Login")) {
        isSessionActive.current = false;
        await performLogin();
        return handleDirectSubmission(null, true);
      }
      
      const sysIdMatch = searchText.match(/js_set_value\((\d+)\)/);
      if (!sysIdMatch) throw new Error("Invalid Challan / No Data Found");
      const sys_id = sysIdMatch[1];

      const popRes = await fetch(`${ctrlUrl}?data=${sys_id}&action=populate_data_from_challan_popup`, {
        method: 'POST', headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: toFormData({ rndval: Date.now() }), credentials: 'include'
      });
      const popText = await popRes.text();

      const getVal = (id) => {
        const regex = new RegExp(id + `.*?\\.val\\(\\s*['"]?([^'")]+)['"]?\\s*\\)`);
        const m = popText.match(regex);
        return m ? m[1].trim() : '0';
      };

      const source = getVal("cbo_source");
      const emb_company = getVal("cbo_emb_company");
      const line = getVal("cbo_line_no");
      const location = getVal("cbo_location");
      const floor = getVal("cbo_floor");

      if ([source, emb_company, line, location].some(x => x === '0' || x === '' || x === 'undefined')) {
        throw new Error("Validation Failed: Missing Source/Line Info.");
      }

      const bunRes = await fetch(`${ctrlUrl}?data=${sys_id}&action=bundle_nos`, { credentials: 'include' });
      const raw_bun = (await bunRes.text()).split("**")[0];
      if (!raw_bun) throw new Error("Empty Bundle List");

      const tblRes = await fetch(`${ctrlUrl}?data=${raw_bun}**0**${sys_id}**${cbo_logic}**${line}&action=populate_bundle_data_update`, { credentials: 'include' });
      const rows = (await tblRes.text()).split('<tr');
      const b_data = [];
      
      rows.forEach(r => {
        if (!r.includes('id="tr_')) return;
        const getRowVal = (regex) => { const m = r.match(regex); return m ? m[1] : '0'; };
        b_data.push({
            barcodeNo: getRowVal(/title="(\d+)"/), bundleNo: getRowVal(/id="bundle_\d+"[^>]*>([^<]+)/),
            orderId: getRowVal(/name="orderId\[\]".*?value="(\d+)"/), gmtsitemId: getRowVal(/name="gmtsitemId\[\]".*?value="(\d+)"/),
            countryId: getRowVal(/name="countryId\[\]".*?value="(\d+)"/), colorId: getRowVal(/name="colorId\[\]".*?value="(\d+)"/),
            sizeId: getRowVal(/name="sizeId\[\]".*?value="(\d+)"/), colorSizeId: getRowVal(/name="colorSizeId\[\]".*?value="(\d+)"/),
            qty: getRowVal(/name="qty\[\]".*?value="(\d+)"/), dtlsId: getRowVal(/name="dtlsId\[\]".*?value="(\d+)"/),
            cutNo: getRowVal(/name="cutNo\[\]".*?value="([^"]+)"/), isRescan: getRowVal(/name="isRescan\[\]".*?value="(\d+)"/)
        });
      });

      setStatusMsg("SAVING DATA...");
      const now = new Date();
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const fmtDate = `${now.getDate().toString().padStart(2,'0')}-${months[now.getMonth()]}-${now.getFullYear()}`;
      const currTime = `${now.getHours()}:${now.getMinutes()}`;

      const payload = {
        action: 'save_update_delete', operation: '0', tot_row: b_data.length,
        garments_nature: "'2'", cbo_company_name: `'${cbo_logic}'`, sewing_production_variable: "'3'",
        cbo_source: `'${source}'`, cbo_emb_company: `'${emb_company}'`, cbo_location: `'${location}'`,
        cbo_floor: `'${floor}'`, txt_issue_date: `'${fmtDate}'`, txt_organic: "''", txt_system_id: "''",
        delivery_basis: "'3'", txt_challan_no: "''", cbo_line_no: `'${line}'`, cbo_shift_name: "'0'",
        cbo_working_company_name: "'0'", cbo_working_location: "'0'", txt_remarks: "''", txt_reporting_hour: `'${currTime}'`
      };

      b_data.forEach((b, i) => {
        const idx = i + 1;
        payload[`bundleNo_${idx}`] = b.bundleNo; payload[`orderId_${idx}`] = b.orderId;
        payload[`gmtsitemId_${idx}`] = b.gmtsitemId; payload[`countryId_${idx}`] = b.countryId;
        payload[`colorId_${idx}`] = b.colorId; payload[`sizeId_${idx}`] = b.sizeId;
        payload[`inseamId_${idx}`] = '0'; payload[`colorSizeId_${idx}`] = b.colorSizeId;
        payload[`qty_${idx}`] = b.qty; payload[`dtlsId_${idx}`] = b.dtlsId;
        payload[`cutNo_${idx}`] = b.cutNo; payload[`isRescan_${idx}`] = b.isRescan;
        payload[`barcodeNo_${idx}`] = b.barcodeNo; payload[`cutMstIdNo_${idx}`] = '0'; payload[`cutNumPrefixNo_${idx}`] = '0';
      });

      const saveRes = await fetch(`${currentBaseUrl.current}/production/requires/bundle_wise_sewing_input_controller.php`, {
        method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: toFormData(payload), credentials: 'include'
      });
      const saveText = await saveRes.text();

      if (saveText.includes("**")) {
        const parts = saveText.split("**");
        const code = parts[0].trim();
        if (code === "0") {
            const new_sys_id = parts[1];
            const new_challan = parts[2] || "Sewing Challan";
            const PRINT_BASE = usingBackup ? BACKUP_URL_PROXY : MAIN_URL;
            const u1 = `${PRINT_BASE}/production/requires/bundle_wise_sewing_input_controller.php?data=1*${new_sys_id}*3*%E2%9D%8F%20Bundle%20Wise%20Sewing%20Input*1*undefined*undefined*undefined&action=emblishment_issue_print_13`;
            const u2 = `${PRINT_BASE}/production/requires/bundle_wise_sewing_input_controller.php?data=1*${new_sys_id}*3*%E2%9D%8F%20Bundle%20Wise%20Sewing%20Input*undefined*undefined*undefined*1&action=sewing_input_challan_print_5`;
            
            await new Promise(r => setTimeout(r, 800));
            setApiResponse({ challan_no: new_challan, system_id: new_sys_id, report1_url: u1, report2_url: u2 });
            setShowResult(true);
        } else if (code === "20") throw new Error("Bundle Already Scanned!");
        else if (code === "10") throw new Error("Server Rejected Data (Code 10)");
        else throw new Error(`Server Error Code: ${code}`);
      } else throw new Error("Save Failed (Invalid Response)");

    } catch (err) {
      if(!isRetry && (err.message.includes("Failed to fetch") || err.message.includes("500"))) {
        if (currentBaseUrl.current === MAIN_URL) {
            currentBaseUrl.current = BACKUP_URL_PROXY;
            isSessionActive.current = false; 
            setUsingBackup(true);
            return handleDirectSubmission(null, true);
        }
      }
      setApiError(err.message || "Connection Error");
      if(err.message.includes("Login")) isSessionActive.current = false;
    } finally {
      if(!isRetry) setIsLoading(false);
    }
  };

  const resetForm = () => { setChallanNo(""); setApiResponse(null); setShowResult(false); };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      <AliveBackground />
      <AnimatePresence>{isLoading && <FullPageLoader status={statusMsg} />}</AnimatePresence>
      {showResult && apiResponse ? ( <ResultDashboard data={apiResponse} onReset={resetForm} /> ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-lg">
          <div className="relative bg-slate-900/50 backdrop-blur-xl p-5 md:p-10 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-slate-700/30">
            <div className="relative z-10">
              <div className="relative w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 flex items-center justify-center">
                  <motion.div className="z-20 bg-slate-900 p-3 md:p-4 rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.3)]" animate={{ scale: [1, 0.95, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}><svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4V20H8V12L12 16L16 12V20H20V4H15L12 9L9 4H4Z" fill="#06b6d4" stroke="#22d3ee" strokeWidth="1" /></svg></motion.div>
              </div>
              <div className="text-center mb-8 pb-4 border-b border-white/5">
                <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight">Cotton Clothing BD Ltd</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className={`w-2 h-2 rounded-full animate-pulse ${usingBackup ? "bg-orange-500" : "bg-green-500"}`}></span>
                  <p className="text-cyan-400/80 text-[10px] md:text-xs font-mono uppercase tracking-widest">{usingBackup ? "Backup Server Active" : "Bundle Wise Sewing Input"}</p>
                </div>
              </div>
              <form onSubmit={(e) => handleDirectSubmission(e)}>
                <CustomDropdown icon={FiBriefcase} label="Select Company" selected={selectedCompany} setSelected={setSelectedCompany} options={companyList} />
                <InputField icon={FiHash} label="Enter Challan No" type="number" id="challan" value={challanNo} onChange={(e) => setChallanNo(e.target.value)} />
                <AnimatePresence>{apiError && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-4 p-3 bg-red-900/40 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-400 text-sm font-bold backdrop-blur-md"><FiAlertTriangle className="text-xl shrink-0" /> {apiError}</motion.div>)}</AnimatePresence>
                <div className="mt-8"><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 md:py-5 rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(8,145,178,0.4)] flex items-center justify-center gap-3 uppercase tracking-widest text-xs md:text-sm group"><span>Submit Data</span> <FiDatabase className="group-hover:rotate-180 transition-transform duration-500" /></motion.button></div>
                <div className="mt-6 pt-4 border-t border-white/5 text-center"><p className="text-slate-500 text-[10px] md:text-xs font-mono tracking-widest uppercase">Developed by <span className="text-cyan-400 font-bold">MNM</span>{' '}<span className="text-cyan-400 font-bold">Software</span></p><p className="text-slate-600 text-[8px] md:text-[10px] font-mono mt-1">&copy; MEHEDI HASAN</p></div>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ContactForm;
