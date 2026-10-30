import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Bookmark,
  CheckCircle,
  Clock,
  Heart,
  Plus,
  Trash2,
  Edit3,
  Search,
  ArrowRight,
  User,
  Check,
  ChevronDown,
  X,
  Calendar,
  Image as ImageIcon,
  DollarSign,
  AlertCircle,
  HelpCircle,
  FileText,
  FolderHeart,
  Share2,
  Lock,
  Layers,
  Wand2,
  Save,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { ALL_SERVICES, CATEGORIES } from '../../data/servicesData';
import salonDB from '../../db/salonDatabase';

export default function BeautyBlueprintSection() {
  const [currentUser, setCurrentUser] = useState(() => salonDB.getCurrentUser());
  const userIdentifier = currentUser?.id || currentUser?.email || 'guest';

  // Master Blueprint State
  const [blueprint, setBlueprint] = useState(() => salonDB.getBeautyBlueprint(userIdentifier));

  // Active dashboard view tab
  // 1: profile, 2: saved-services, 3: inspiration, 4: journal, 5: recommendations, 6: plans, 7: consultation-history
  const [activeTab, setActiveTab] = useState('profile');

  // Sync with database updates
  useEffect(() => {
    const sync = () => {
      const u = salonDB.getCurrentUser();
      setCurrentUser(u);
      const ident = u?.id || u?.email || 'guest';
      setBlueprint(salonDB.getBeautyBlueprint(ident));
    };
    sync();
    const unsub = salonDB.subscribe(sync);
    return () => unsub();
  }, [userIdentifier]);

  // Toast / feedback message
  const [toastMsg, setToastMsg] = useState('');
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  // ---------------------------------------------------------------------------
  // SECTION 1: MY BEAUTY PROFILE STATE & HANDLERS
  // ---------------------------------------------------------------------------
  const [profileForm, setProfileForm] = useState(() => blueprint.profile || {});
  const [newStyleTag, setNewStyleTag] = useState('');
  const [newColorTag, setNewColorTag] = useState('');
  const [newGoalTag, setNewGoalTag] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    if (blueprint.profile) {
      setProfileForm(blueprint.profile);
    }
  }, [blueprint.profile]);

  const handleSaveProfile = (e) => {
    if (e) e.preventDefault();
    setIsSavingProfile(true);
    try {
      salonDB.updateBeautyProfile(userIdentifier, profileForm);
      showToast('✓ Beauty Profile updated successfully.');
    } catch (err) {
      console.warn('Error saving profile:', err);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const addTag = (field, tag, setter) => {
    if (!tag.trim()) return;
    const current = profileForm[field] || [];
    if (!current.includes(tag.trim())) {
      setProfileForm({ ...profileForm, [field]: [...current, tag.trim()] });
    }
    setter('');
  };

  const removeTag = (field, tagToRemove) => {
    const current = profileForm[field] || [];
    setProfileForm({ ...profileForm, [field]: current.filter(t => t !== tagToRemove) });
  };

  // ---------------------------------------------------------------------------
  // SECTION 2: MY SAVED SERVICES
  // ---------------------------------------------------------------------------
  const [savedServicesSearch, setSavedServicesSearch] = useState('');
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategory, setCatalogCategory] = useState('all');
  const [editingSavedService, setEditingSavedService] = useState(null);

  const filteredSavedServices = useMemo(() => {
    const list = blueprint.savedServices || [];
    if (!savedServicesSearch.trim()) return list;
    const q = savedServicesSearch.toLowerCase().trim();
    return list.filter(s => 
      s.serviceName.toLowerCase().includes(q) ||
      (s.categoryName && s.categoryName.toLowerCase().includes(q)) ||
      (s.personalNotes && s.personalNotes.toLowerCase().includes(q))
    );
  }, [blueprint.savedServices, savedServicesSearch]);

  const catalogFilteredServices = useMemo(() => {
    return ALL_SERVICES.filter(s => {
      if (s.active === false) return false;
      const matchesCat = catalogCategory === 'all' || s.category === catalogCategory;
      const q = catalogSearch.toLowerCase().trim();
      const matchesQ = !q || s.name.toLowerCase().includes(q) || (s.description && s.description.toLowerCase().includes(q));
      return matchesCat && matchesQ;
    });
  }, [catalogCategory, catalogSearch]);

  const handleAddServiceToSaved = (service) => {
    salonDB.addSavedServiceToBlueprint(userIdentifier, {
      serviceId: service.id,
      serviceName: service.name,
      category: service.category,
      categoryName: service.categoryName || service.category,
      price: Number(service.price) || 0,
      duration: service.durationDisplay || service.duration || '45 min',
      image: service.image,
      customizationOptions: 'Standard Atelier Formulation',
      personalNotes: '',
      desiredResults: 'Bespoke precision finish'
    });
    showToast(`✓ Added “${service.name}” to Saved Services.`);
    setShowAddServiceModal(false);
  };

  const handleRemoveSavedService = (id) => {
    salonDB.removeSavedServiceFromBlueprint(userIdentifier, id);
    showToast('Service removed from your saved list.');
  };

  const handleSaveServiceEdit = (e) => {
    e.preventDefault();
    if (!editingSavedService) return;
    const list = blueprint.savedServices || [];
    const updated = list.map(s => s.id === editingSavedService.id ? editingSavedService : s);
    salonDB.saveBeautyBlueprint(userIdentifier, { ...blueprint, savedServices: updated });
    setEditingSavedService(null);
    showToast('✓ Saved service notes updated.');
  };

  // ---------------------------------------------------------------------------
  // SECTION 3: INSPIRATION COLLECTION
  // ---------------------------------------------------------------------------
  const [selectedInspoCollection, setSelectedInspoCollection] = useState('All');
  const [newInspoModalOpen, setNewInspoModalOpen] = useState(false);
  const [newInspoForm, setNewInspoForm] = useState({
    caption: '',
    collection: 'Hair Inspiration',
    customCollection: '',
    associatedServiceId: '',
    notes: '',
    dataUrl: '',
    name: ''
  });
  const inspoFileInputRef = useRef(null);

  const inspoCollectionsList = useMemo(() => {
    const defaultCols = ['Hair Inspiration', 'Nail Art', 'Makeup Looks', 'Bridal Ideas', 'Mehndi Designs', 'My Favourite Looks'];
    const customCols = (blueprint.inspiration || [])
      .map(i => i.collection)
      .filter(c => c && !defaultCols.includes(c));
    return ['All', ...defaultCols, ...Array.from(new Set(customCols))];
  }, [blueprint.inspiration]);

  const filteredInspiration = useMemo(() => {
    const list = blueprint.inspiration || [];
    if (selectedInspoCollection === 'All') return list;
    return list.filter(i => i.collection === selectedInspoCollection);
  }, [blueprint.inspiration, selectedInspoCollection]);

  const handleInspoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Inspiration photo exceeds 5MB limit. Please choose a smaller image.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setNewInspoForm(prev => ({
        ...prev,
        dataUrl: uploadEvent.target.result,
        name: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveInspiration = (e) => {
    e.preventDefault();
    if (!newInspoForm.dataUrl) {
      alert('Please upload an inspiration image.');
      return;
    }
    const finalCollection = newInspoForm.customCollection.trim() || newInspoForm.collection || 'My Favourite Looks';
    const associatedSrv = ALL_SERVICES.find(s => s.id === newInspoForm.associatedServiceId);

    salonDB.addInspirationToBlueprint(userIdentifier, {
      name: newInspoForm.name || 'inspiration_photo.jpg',
      dataUrl: newInspoForm.dataUrl,
      caption: newInspoForm.caption.trim() || 'Inspiration Look',
      collection: finalCollection,
      associatedServiceId: newInspoForm.associatedServiceId || null,
      associatedServiceName: associatedSrv?.name || null,
      notes: newInspoForm.notes.trim()
    });

    setNewInspoForm({
      caption: '',
      collection: 'Hair Inspiration',
      customCollection: '',
      associatedServiceId: '',
      notes: '',
      dataUrl: '',
      name: ''
    });
    setNewInspoModalOpen(false);
    showToast('✓ Inspiration photo added to moodboard.');
  };

  const handleRemoveInspiration = (id) => {
    salonDB.removeInspirationFromBlueprint(userIdentifier, id);
    showToast('Inspiration image removed.');
  };

  // ---------------------------------------------------------------------------
  // SECTION 4: CONSULTATION NOTES & JOURNAL
  // ---------------------------------------------------------------------------
  const [newJournalModalOpen, setNewJournalModalOpen] = useState(false);
  const [newJournalForm, setNewJournalForm] = useState({
    title: '',
    content: '',
    linkedServiceName: ''
  });

  const handleSaveJournalNote = (e) => {
    e.preventDefault();
    if (!newJournalForm.title.trim() || !newJournalForm.content.trim()) {
      alert('Please provide a title and note description.');
      return;
    }
    salonDB.addJournalNoteToBlueprint(userIdentifier, {
      title: newJournalForm.title.trim(),
      content: newJournalForm.content.trim(),
      type: 'customer_note',
      author: currentUser?.name || 'Customer',
      isSalonApproved: false,
      linkedServiceName: newJournalForm.linkedServiceName || null
    });
    setNewJournalForm({ title: '', content: '', linkedServiceName: '' });
    setNewJournalModalOpen(false);
    showToast('✓ Consultation note saved to your journal.');
  };

  const handleDeleteJournalNote = (id) => {
    salonDB.deleteJournalNoteFromBlueprint(userIdentifier, id);
    showToast('Journal note deleted.');
  };

  // ---------------------------------------------------------------------------
  // SECTION 5: SALON-APPROVED RECOMMENDATIONS
  // ---------------------------------------------------------------------------
  const handleAcceptRecommendation = (recId) => {
    salonDB.updateBlueprintRecommendationStatus(userIdentifier, recId, 'Accepted by Customer');
    showToast('✓ Recommendation accepted! Added to your approved treatment repertoire.');
  };

  const handleDeclineRecommendation = (recId) => {
    salonDB.updateBlueprintRecommendationStatus(userIdentifier, recId, 'Declined by Customer');
    showToast('Recommendation declined.');
  };

  // ---------------------------------------------------------------------------
  // SECTION 6: BEAUTY PLAN BUILDER
  // ---------------------------------------------------------------------------
  const [planBuilderModalOpen, setPlanBuilderModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [planForm, setPlanForm] = useState({
    title: '',
    occasion: 'Wedding & Reception Gala',
    targetDate: '',
    serviceIds: [],
    notes: ''
  });

  const handleOpenPlanBuilder = (existingPlan = null) => {
    if (existingPlan) {
      setEditingPlan(existingPlan);
      setPlanForm({
        title: existingPlan.title || '',
        occasion: existingPlan.occasion || 'Wedding & Reception Gala',
        targetDate: existingPlan.targetDate || '',
        serviceIds: existingPlan.serviceIds || [],
        notes: existingPlan.notes || ''
      });
    } else {
      setEditingPlan(null);
      setPlanForm({
        title: '',
        occasion: 'Wedding & Reception Gala',
        targetDate: '',
        serviceIds: [],
        notes: ''
      });
    }
    setPlanBuilderModalOpen(true);
  };

  const togglePlanService = (serviceId) => {
    setPlanForm(prev => {
      const exists = prev.serviceIds.includes(serviceId);
      if (exists) {
        return { ...prev, serviceIds: prev.serviceIds.filter(id => id !== serviceId) };
      } else {
        return { ...prev, serviceIds: [...prev.serviceIds, serviceId] };
      }
    });
  };

  const handleSavePlan = (e) => {
    e.preventDefault();
    if (!planForm.title.trim()) {
      alert('Please give your beauty plan a name (e.g. Wedding Gala Glamour).');
      return;
    }

    const selectedServiceObjects = ALL_SERVICES
      .filter(s => planForm.serviceIds.includes(s.id))
      .map(s => ({
        id: s.id,
        name: s.name,
        price: Number(s.price) || 0,
        duration: s.durationDisplay || s.duration || '45 min'
      }));

    const totalEstPrice = selectedServiceObjects.reduce((acc, s) => acc + s.price, 0);
    const totalEstMins = selectedServiceObjects.reduce((acc, s) => acc + salonDB.parseServiceDurationMinutes(s.duration), 0);

    const payload = {
      ...(editingPlan ? { id: editingPlan.id } : {}),
      title: planForm.title.trim(),
      occasion: planForm.occasion,
      targetDate: planForm.targetDate,
      serviceIds: planForm.serviceIds,
      services: selectedServiceObjects,
      notes: planForm.notes.trim(),
      estimatedTotal: totalEstPrice,
      estimatedDuration: `${totalEstMins} min`
    };

    salonDB.saveBeautyPlanToBlueprint(userIdentifier, payload);
    setPlanBuilderModalOpen(false);
    showToast(`✓ Beauty plan “${payload.title}” saved.`);
  };

  const handleDeletePlan = (planId) => {
    salonDB.deleteBeautyPlanFromBlueprint(userIdentifier, planId);
    showToast('Beauty plan deleted.');
  };

  // ---------------------------------------------------------------------------
  // SECTION 7: MY CONSULTATION HISTORY
  // ---------------------------------------------------------------------------
  const consultationRequests = useMemo(() => {
    const list = salonDB.getCustomRequests() || [];
    const email = (currentUser?.email || '').toLowerCase().trim();
    const userId = currentUser?.id;
    return list.filter(r => {
      if (userId && r.customerId === userId) return true;
      if (email && r.customerEmail && r.customerEmail.toLowerCase().trim() === email) return true;
      return false;
    });
  }, [currentUser]);

  // Counts for tabs
  const savedCount = (blueprint.savedServices || []).length;
  const inspoCount = (blueprint.inspiration || []).length;
  const journalCount = (blueprint.journal || []).length;
  const recsCount = (blueprint.recommendations || []).length;
  const plansCount = (blueprint.plans || []).length;
  const historyCount = consultationRequests.length;

  return (
    <section 
      id="beauty-blueprint" 
      className="w-full bg-[#F7F4ED] text-[#10110F] py-16 sm:py-20 lg:py-24 border-t border-[#DCE1D8] font-sans selection:bg-[#263D2B] selection:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================================================================= */}
        {/* SECTION HEADER                                                    */}
        {/* ================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#263D2B]/10 border border-[#263D2B]/20 text-[#263D2B] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#263D2B]" />
            <span>CLIENT BEAUTY DOSSIER</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#10110F] font-normal tracking-tight mb-4">
            My Beauty Blueprint
          </h2>

          <p className="text-sm sm:text-base text-[#465640] leading-relaxed">
            “Your beauty vision, thoughtfully planned. Save your favourite services, collect inspiration, and keep your personalized beauty recommendations in one place.”
          </p>

          {/* User Sign-in Notice / Verified Profile Pill */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {currentUser ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DCE1D8] text-xs font-semibold text-[#10110F]">
                <User className="w-3.5 h-3.5 text-[#263D2B]" />
                <span>Blueprint linked to {currentUser.name || currentUser.email}</span>
              </span>
            ) : (
              <div className="inline-flex items-center gap-2 text-xs text-[#465640] bg-white/60 px-3.5 py-1.5 rounded-full border border-[#DCE1D8]">
                <span>Saving locally to this device.</span>
                <Link to="/login?redirect=/contact#beauty-blueprint" className="font-bold text-[#263D2B] hover:underline">
                  Sign In to sync across all devices
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Global Action Toast Notification */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#10110F] text-[#F7F4ED] text-xs font-bold shadow-2xl flex items-center gap-2 border border-white/20 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* ================================================================= */}
        {/* DASHBOARD 7-SECTION NAVIGATION TABS                               */}
        {/* ================================================================= */}
        <div className="flex justify-center mb-8 sm:mb-10 overflow-x-auto pb-2">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-white border border-[#DCE1D8] shadow-xs">
            {[
              { id: 'profile', label: '1. Beauty Profile', count: null },
              { id: 'saved-services', label: '2. Saved Services', count: savedCount },
              { id: 'inspiration', label: '3. Inspiration', count: inspoCount },
              { id: 'journal', label: '4. Consultation Journal', count: journalCount },
              { id: 'recommendations', label: '5. Recommended for You', count: recsCount },
              { id: 'plans', label: '6. Beauty Plans', count: plansCount },
              { id: 'history', label: '7. Consultation History', count: historyCount }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-[#263D2B] text-white shadow-xs'
                    : 'text-[#465640] hover:text-[#10110F] hover:bg-[#F7F4ED]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#263D2B]/10 text-[#263D2B]'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* TAB 1: MY BEAUTY PROFILE                                          */}
        {/* ================================================================= */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#DCE1D8] p-6 sm:p-10 shadow-md space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DCE1D8] pb-4">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#10110F]">
                  Personal Beauty Profile & Preferences
                </h3>
                <p className="text-xs text-[#465640] mt-0.5">
                  Your customized style notes, goals, and sensitivities. Reused seamlessly across consultation requests and bookings.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={isSavingProfile}
                className="px-5 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              
              {/* Preferred Beauty Styles & Looks */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#263D2B] block">
                  Preferred Beauty Styles & Signature Looks
                </label>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {(profileForm.preferredStyles || []).map((style, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-xs font-semibold text-[#10110F]"
                    >
                      <span>{style}</span>
                      <button 
                        type="button" 
                        onClick={() => removeTag('preferredStyles', style)}
                        className="text-[#6B7068] hover:text-rose-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newStyleTag}
                    onChange={(e) => setNewStyleTag(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag('preferredStyles', newStyleTag, setNewStyleTag); } }}
                    placeholder="Add a preferred style (e.g. Soft Balayage, Glass Skin, French Tip)..."
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  />
                  <button
                    type="button"
                    onClick={() => addTag('preferredStyles', newStyleTag, setNewStyleTag)}
                    className="px-4 py-2 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] hover:bg-white text-xs font-semibold text-[#10110F]"
                  >
                    Add Style
                  </button>
                </div>
              </div>

              {/* Favourite Colours, Finishes, & Finishes */}
              <div className="space-y-2 pt-2 border-t border-[#DCE1D8]">
                <label className="text-xs font-bold uppercase tracking-wider text-[#263D2B] block">
                  Favourite Colours, Shades & Finishes
                </label>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {(profileForm.favoriteColors || []).map((color, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F4ED] border border-[#DCE1D8] text-xs font-semibold text-[#10110F]"
                    >
                      <span>{color}</span>
                      <button 
                        type="button" 
                        onClick={() => removeTag('favoriteColors', color)}
                        className="text-[#6B7068] hover:text-rose-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newColorTag}
                    onChange={(e) => setNewColorTag(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag('favoriteColors', newColorTag, setNewColorTag); } }}
                    placeholder="Add a shade or finish (e.g. Honey Glaze, Rose Gold, Chrome Pearl, Matte Velvet)..."
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  />
                  <button
                    type="button"
                    onClick={() => addTag('favoriteColors', newColorTag, setNewColorTag)}
                    className="px-4 py-2 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] hover:bg-white text-xs font-semibold text-[#10110F]"
                  >
                    Add Shade
                  </button>
                </div>
              </div>

              {/* Desired Results & Goals */}
              <div className="space-y-2 pt-2 border-t border-[#DCE1D8]">
                <label className="text-xs font-bold uppercase tracking-wider text-[#263D2B] block">
                  Desired Results & Ongoing Beauty Goals
                </label>
                <textarea
                  rows={3}
                  value={profileForm.desiredResults || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, desiredResults: e.target.value })}
                  placeholder="Describe your desired outcomes (e.g. Improve hair density, maintain low-maintenance dimensional color, strengthen natural nails)..."
                  className="w-full p-3.5 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                />
                
                {/* Quick Goal Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {(profileForm.beautyGoals || []).map((goal, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-[#263D2B]/10 text-[#263D2B] text-[11px] font-bold flex items-center gap-1">
                      <span>{goal}</span>
                      <button type="button" onClick={() => removeTag('beautyGoals', goal)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newGoalTag}
                    onChange={(e) => setNewGoalTag(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag('beautyGoals', newGoalTag, setNewGoalTag); } }}
                    placeholder="Add specific beauty goal tag..."
                    className="flex-1 px-3.5 py-1.5 text-xs rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]/40"
                  />
                  <button
                    type="button"
                    onClick={() => addTag('beautyGoals', newGoalTag, setNewGoalTag)}
                    className="px-3 py-1.5 rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-xs font-semibold"
                  >
                    Add Goal
                  </button>
                </div>
              </div>

              {/* Preferred Maintenance Level */}
              <div className="space-y-2 pt-2 border-t border-[#DCE1D8]">
                <label className="text-xs font-bold uppercase tracking-wider text-[#263D2B] block">
                  Preferred Routine Maintenance Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'Low', desc: 'Minimal upkeep, soft blended regrowth, effortless routine' },
                    { id: 'Medium', desc: 'Scheduled touch-ups every 6-8 weeks, balanced care' },
                    { id: 'High Glam', desc: 'Precision styling, high impact finish, regular studio rituals' }
                  ].map(lvl => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setProfileForm({ ...profileForm, maintenanceLevel: lvl.id })}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        profileForm.maintenanceLevel === lvl.id
                          ? 'bg-[#263D2B] text-white border-[#263D2B] shadow-xs'
                          : 'bg-[#F7F4ED] text-[#10110F] border-[#DCE1D8] hover:bg-white'
                      }`}
                    >
                      <div className="font-bold text-xs">{lvl.id} Maintenance</div>
                      <div className={`text-[10px] mt-1 leading-snug ${
                        profileForm.maintenanceLevel === lvl.id ? 'text-white/80' : 'text-[#6B7068]'
                      }`}>
                        {lvl.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Things to Avoid & Sensitivities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#DCE1D8]">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-rose-900 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-700" />
                    <span>Things to Avoid (Strict Dislikes)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={profileForm.thingsToAvoid || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, thingsToAvoid: e.target.value })}
                    placeholder="e.g. Heavy powdery makeup, warm brassy highlights, razor cutting, harsh chemicals"
                    className="w-full p-3 text-xs rounded-xl border border-rose-200 bg-rose-50/20 text-[#10110F] focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-900 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                    <span>Product Sensitivities & Allergies</span>
                  </label>
                  <textarea
                    rows={2}
                    value={profileForm.sensitivities || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, sensitivities: e.target.value })}
                    placeholder="e.g. Fragrance sensitivity, seasonal dry scalp, latex allergy, delicate cuticles"
                    className="w-full p-3 text-xs rounded-xl border border-amber-200 bg-amber-50/20 text-[#10110F] focus:outline-none focus:ring-2 focus:ring-amber-600"
                  />
                </div>
              </div>

              {/* Upcoming Occasions & Event Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#DCE1D8]">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#10110F] block">
                    Upcoming Occasion / Event
                  </label>
                  <input
                    type="text"
                    value={profileForm.upcomingOccasion || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, upcomingOccasion: e.target.value })}
                    placeholder="e.g. Wedding Reception Gala, Birthday Celebration, Editorial Shoot"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] focus:ring-2 focus:ring-[#263D2B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#10110F] block">
                    Target Event Date
                  </label>
                  <input
                    type="date"
                    value={profileForm.eventDate || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, eventDate: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] focus:ring-2 focus:ring-[#263D2B]"
                  />
                </div>
              </div>

              {/* General Consultation Preferences */}
              <div className="space-y-1 pt-2 border-t border-[#DCE1D8]">
                <label className="text-xs font-bold text-[#263D2B] block">
                  Studio Concierge & Consultation Preferences
                </label>
                <input
                  type="text"
                  value={profileForm.consultationPreferences || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, consultationPreferences: e.target.value })}
                  placeholder="e.g. Prefer quiet appointment, hijab-friendly private curtain suite, open to toner revisions"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#DCE1D8] bg-white text-[#10110F] focus:ring-2 focus:ring-[#263D2B]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="px-8 py-3 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingProfile ? 'Saving...' : 'Update Beauty Profile'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: MY SAVED SERVICES                                          */}
        {/* ================================================================= */}
        {activeTab === 'saved-services' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Top Toolbar */}
            <div className="bg-white rounded-3xl border border-[#DCE1D8] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B5A0]" />
                <input
                  type="text"
                  value={savedServicesSearch}
                  onChange={(e) => setSavedServicesSearch(e.target.value)}
                  placeholder="Search saved services by name, category, or personal note..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowAddServiceModal(true)}
                className="px-5 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold tracking-wider uppercase transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Save Catalog Service</span>
              </button>
            </div>

            {/* Saved Services Cards */}
            {filteredSavedServices.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#DCE1D8] p-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center mx-auto">
                  <Bookmark className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#10110F]">No Saved Services Yet</h4>
                <p className="text-xs text-[#6B7068] max-w-md mx-auto">
                  Browse our complete 85-service catalog and save your dream rituals, treatments, and enhancements here.
                </p>
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(true)}
                  className="px-5 py-2 rounded-xl bg-[#263D2B] text-white text-xs font-semibold"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredSavedServices.map(service => (
                  <div
                    key={service.id}
                    className="bg-white rounded-3xl border border-[#DCE1D8] p-5 shadow-xs hover:border-[#263D2B]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      {service.image ? (
                        <img 
                          src={service.image} 
                          alt={service.serviceName} 
                          className="w-20 h-20 rounded-2xl object-cover border border-[#DCE1D8] shrink-0"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-2xl bg-[#263D2B]/10 flex items-center justify-center text-[#263D2B] font-serif font-bold text-xl shrink-0">
                          GJ
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#465640] bg-[#F7F4ED] px-2 py-0.5 rounded-md">
                            {service.categoryName || service.category}
                          </span>
                          <span className="text-[10px] text-[#6B7068]">
                            Saved {new Date(service.savedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h4 className="font-serif text-base font-bold text-[#10110F]">
                          {service.serviceName}
                        </h4>

                        <div className="text-xs text-[#263D2B] font-bold">
                          ${service.price} CAD • {service.duration}
                        </div>

                        {service.customizationOptions && (
                          <div className="text-[11px] text-[#10110F] font-medium">
                            <span className="text-[#6B7068]">Options:</span> {service.customizationOptions}
                          </div>
                        )}

                        {service.personalNotes && (
                          <div className="text-[11px] text-[#465640] italic bg-[#F7F4ED]/60 p-2 rounded-xl mt-1">
                            “{service.personalNotes}”
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-3 sm:pt-0 border-t sm:border-0 border-[#DCE1D8]">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingSavedService({ ...service })}
                          className="p-2 rounded-xl text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED]"
                          title="Edit Personal Notes"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveSavedService(service.id)}
                          className="p-2 rounded-xl text-rose-700 hover:text-rose-900 hover:bg-rose-50"
                          title="Remove from Saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/contact#custom-consultation`}
                          className="px-3 py-1.5 rounded-xl border border-[#DCE1D8] text-[11px] font-semibold text-[#10110F] hover:bg-[#F7F4ED]"
                        >
                          Consultation
                        </Link>
                        <Link
                          to={`/book-appointment?service=${service.serviceId}`}
                          className="px-3.5 py-1.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-[11px] font-bold shadow-xs flex items-center gap-1"
                        >
                          <span>Book</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: INSPIRATION COLLECTION (MOODBOARD)                         */}
        {/* ================================================================= */}
        {activeTab === 'inspiration' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Toolbar & Collections Filter */}
            <div className="bg-white rounded-3xl border border-[#DCE1D8] p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#10110F]">
                    Personal Beauty Moodboard & Inspiration
                  </h3>
                  <p className="text-xs text-[#465640]">
                    Upload and categorize reference photos for your hair, nails, makeup, and rituals.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setNewInspoModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold tracking-wider uppercase transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Inspiration Image</span>
                </button>
              </div>

              {/* Collections Filter Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#DCE1D8]">
                {inspoCollectionsList.map(col => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => setSelectedInspoCollection(col)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedInspoCollection === col
                        ? 'bg-[#263D2B] text-white shadow-xs'
                        : 'bg-[#F7F4ED] text-[#465640] hover:bg-[#EBEFE8]'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Inspiration Grid */}
            {filteredInspiration.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#DCE1D8] p-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center mx-auto">
                  <ImageIcon className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#10110F]">No Inspiration Photos in this Collection</h4>
                <p className="text-xs text-[#6B7068] max-w-md mx-auto">
                  Upload screenshots of styles, placements, and aesthetics you want to discuss with Janki.
                </p>
                <button
                  type="button"
                  onClick={() => setNewInspoModalOpen(true)}
                  className="px-5 py-2 rounded-xl bg-[#263D2B] text-white text-xs font-semibold"
                >
                  Upload First Image
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredInspiration.map(photo => (
                  <div
                    key={photo.id}
                    className="bg-white rounded-3xl border border-[#DCE1D8] overflow-hidden shadow-xs hover:border-[#263D2B]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-square w-full bg-[#F7F4ED] overflow-hidden">
                        <img
                          src={photo.dataUrl}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveInspiration(photo.id)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-rose-700 transition-colors cursor-pointer"
                          title="Remove image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                          {photo.collection}
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <h4 className="font-serif text-sm font-bold text-[#10110F]">
                          {photo.caption}
                        </h4>

                        {photo.associatedServiceName && (
                          <div className="text-[11px] text-[#263D2B] font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#263D2B]" />
                            <span>Linked to {photo.associatedServiceName}</span>
                          </div>
                        )}

                        {photo.notes && (
                          <p className="text-xs text-[#465640] italic leading-relaxed bg-[#F7F4ED]/60 p-2.5 rounded-xl">
                            “{photo.notes}”
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-4 pt-0 text-[10px] text-[#6B7068] flex items-center justify-between border-t border-[#DCE1D8]/40 mt-2 pt-2">
                      <span>Uploaded {new Date(photo.uploadedAt).toLocaleDateString()}</span>
                      <Link
                        to="/contact#custom-consultation"
                        className="font-bold text-[#263D2B] hover:underline"
                      >
                        Use in Consultation →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: CONSULTATION JOURNAL                                       */}
        {/* ================================================================= */}
        {activeTab === 'journal' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Header Card */}
            <div className="bg-white rounded-3xl border border-[#DCE1D8] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#10110F]">
                  Consultation Journal & Salon Correspondence
                </h3>
                <p className="text-xs text-[#465640]">
                  Record personal beauty thoughts, previous consultation notes, and official atelier guidance from Janki Khatroja.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setNewJournalModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold tracking-wider uppercase transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Write Journal Entry</span>
              </button>
            </div>

            {/* Notes List */}
            {(!blueprint.journal || blueprint.journal.length === 0) ? (
              <div className="bg-white rounded-3xl border border-[#DCE1D8] p-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center mx-auto">
                  <FileText className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#10110F]">No Journal Entries Yet</h4>
                <p className="text-xs text-[#6B7068] max-w-md mx-auto">
                  Record questions for your stylist, personal feedback from your last visit, and styling reminders.
                </p>
                <button
                  type="button"
                  onClick={() => setNewJournalModalOpen(true)}
                  className="px-5 py-2 rounded-xl bg-[#263D2B] text-white text-xs font-semibold"
                >
                  Create Note
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {blueprint.journal.map(note => {
                  const isSalonReply = note.type === 'salon_reply';
                  return (
                    <div
                      key={note.id}
                      className={`rounded-3xl border p-5 sm:p-6 transition-all ${
                        isSalonReply
                          ? 'bg-[#263D2B]/5 border-[#263D2B]/30'
                          : 'bg-white border-[#DCE1D8]'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE1D8]/60 pb-3">
                        <div className="flex items-center gap-2">
                          {isSalonReply ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#263D2B] text-white">
                              <ShieldCheck className="w-3 h-3" />
                              <span>Salon-Approved Correspondence</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F7F4ED] text-[#465640] border border-[#DCE1D8]">
                              <User className="w-3 h-3 text-[#263D2B]" />
                              <span>Personal Customer Note</span>
                            </span>
                          )}

                          <span className="text-xs text-[#6B7068]">
                            by <strong>{note.author}</strong> on {new Date(note.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {!isSalonReply && (
                          <button
                            type="button"
                            onClick={() => handleDeleteJournalNote(note.id)}
                            className="text-rose-700 hover:text-rose-900 p-1 rounded-md"
                            title="Delete note"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="pt-3 space-y-2">
                        <h4 className="font-serif text-base font-bold text-[#10110F]">
                          {note.title}
                        </h4>

                        <p className="text-xs text-[#10110F] leading-relaxed whitespace-pre-line">
                          {note.content}
                        </p>

                        {note.linkedServiceName && (
                          <div className="pt-2 text-[11px] text-[#263D2B] font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Linked to treatment: <strong>{note.linkedServiceName}</strong></span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 5: SALON-APPROVED RECOMMENDATIONS ("RECOMMENDED FOR YOU")      */}
        {/* ================================================================= */}
        {activeTab === 'recommendations' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Header info */}
            <div className="bg-white rounded-3xl border border-[#DCE1D8] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#263D2B]/10 text-[#263D2B] mb-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Official Atelier Recommendations</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#10110F]">
                  Recommended for You by Janki Khatroja
                </h3>
                <p className="text-xs text-[#465640]">
                  Professional recommendations customized to your hair texture, skin barrier, and beauty goals.
                </p>
              </div>

              <span className="text-xs text-[#6B7068] font-medium shrink-0">
                {blueprint.recommendations?.length || 0} Recommendation{blueprint.recommendations?.length === 1 ? '' : 's'}
              </span>
            </div>

            {/* Recommendations Grid */}
            {(!blueprint.recommendations || blueprint.recommendations.length === 0) ? (
              <div className="bg-white rounded-3xl border border-[#DCE1D8] p-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center mx-auto">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#10110F]">No Active Recommendations</h4>
                <p className="text-xs text-[#6B7068] max-w-md mx-auto">
                  Submit a consultation request on the contact page or complete your profile to receive tailored suggestions from our senior artists.
                </p>
                <Link
                  to="/contact#custom-consultation"
                  className="inline-block px-5 py-2.5 rounded-xl bg-[#263D2B] text-white text-xs font-semibold"
                >
                  Submit Consultation Request
                </Link>
              </div>
            ) : (
              <div className="space-y-5">
                {blueprint.recommendations.map(rec => {
                  const isAccepted = rec.status === 'Accepted by Customer';
                  const isDeclined = rec.status === 'Declined by Customer';
                  const isAwaiting = rec.status === 'Awaiting Customer Review' || rec.status === 'Suggested';

                  return (
                    <div
                      key={rec.id}
                      className="bg-white rounded-3xl border border-[#DCE1D8] p-6 shadow-xs hover:border-[#263D2B]/40 transition-all space-y-4"
                    >
                      {/* Top Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE1D8] pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-base font-bold text-[#10110F]">
                            {rec.serviceName}
                          </span>
                          <span className="text-xs text-[#263D2B] font-bold">
                            (${rec.approvedPrice || rec.price} CAD • {rec.approvedDuration || '60 min'})
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div>
                          {isAccepted ? (
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300">
                              ✓ Accepted by You
                            </span>
                          ) : isDeclined ? (
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-200">
                              ✕ Declined
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-900 border border-blue-200">
                              Awaiting Your Review
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Details Content */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="md:col-span-2 space-y-2.5">
                          <div>
                            <span className="font-bold text-[#263D2B] uppercase tracking-wider text-[10px] block">
                              Why the Salon Recommends This:
                            </span>
                            <p className="text-[#10110F] mt-0.5 leading-relaxed">
                              {rec.reason}
                            </p>
                          </div>

                          {rec.professionalAdvice && (
                            <div className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8]">
                              <span className="font-bold text-[#10110F] block">
                                Professional Advice & Aftercare Guidance:
                              </span>
                              <p className="text-[#465640] italic mt-0.5 leading-relaxed">
                                “{rec.professionalAdvice}”
                              </p>
                            </div>
                          )}

                          {rec.prepSteps && (
                            <div className="text-[11px] text-[#465640]">
                              <strong>Recommended Preparation:</strong> {rec.prepSteps}
                            </div>
                          )}

                          <div className="text-[10px] text-[#6B7068] pt-1">
                            Recommended by <strong>{rec.professionalName || 'Janki Khatroja'}</strong> on {rec.date}
                          </div>
                        </div>

                        {/* Action Box */}
                        <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex flex-col justify-between space-y-3">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#6B7068] block">
                              Quoted Rate & Duration
                            </span>
                            <div className="text-lg font-serif font-extrabold text-[#263D2B] mt-0.5">
                              ${rec.approvedPrice || rec.price} CAD
                            </div>
                            <div className="text-xs text-[#10110F]">
                              Duration: {rec.approvedDuration || '60 min'}
                            </div>
                          </div>

                          {isAwaiting && (
                            <div className="space-y-2">
                              <button
                                type="button"
                                onClick={() => handleAcceptRecommendation(rec.id)}
                                className="w-full py-2 px-3 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold transition-colors shadow-xs"
                              >
                                Accept Recommendation
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeclineRecommendation(rec.id)}
                                className="w-full py-1.5 px-3 rounded-xl border border-rose-300 text-rose-800 hover:bg-rose-50 text-xs font-semibold transition-colors"
                              >
                                Decline
                              </button>
                            </div>
                          )}

                          {isAccepted && (
                            <Link
                              to={`/book-appointment?service=${rec.serviceId}`}
                              className="w-full py-2 px-3 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-xs"
                            >
                              <span>Schedule Service</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 6: MY BEAUTY PLANS                                            */}
        {/* ================================================================= */}
        {activeTab === 'plans' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Header Toolbar */}
            <div className="bg-white rounded-3xl border border-[#DCE1D8] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#10110F]">
                  Multi-Service Beauty Plans
                </h3>
                <p className="text-xs text-[#465640]">
                  Combine saved services, preferences, and recommendations into a comprehensive event plan.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPlanBuilder()}
                className="px-5 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold tracking-wider uppercase transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Beauty Plan</span>
              </button>
            </div>

            {/* Plans List */}
            {(!blueprint.plans || blueprint.plans.length === 0) ? (
              <div className="bg-white rounded-3xl border border-[#DCE1D8] p-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center mx-auto">
                  <Layers className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#10110F]">No Beauty Plans Created</h4>
                <p className="text-xs text-[#6B7068] max-w-md mx-auto">
                  Plan multiple treatments for your wedding, graduation, holiday season, or seasonal beauty regimen.
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenPlanBuilder()}
                  className="px-5 py-2 rounded-xl bg-[#263D2B] text-white text-xs font-semibold"
                >
                  Build Your First Plan
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {blueprint.plans.map(plan => (
                  <div
                    key={plan.id}
                    className="bg-white rounded-3xl border border-[#DCE1D8] p-6 shadow-xs hover:border-[#263D2B]/40 transition-all space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE1D8] pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#263D2B] bg-[#263D2B]/10 px-2.5 py-0.5 rounded-full">
                            {plan.occasion || 'Event Plan'}
                          </span>
                          {plan.targetDate && (
                            <span className="text-xs text-[#6B7068]">
                              Target: <strong>{plan.targetDate}</strong>
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-xl font-bold text-[#10110F] mt-1">
                          {plan.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenPlanBuilder(plan)}
                          className="p-2 rounded-xl text-[#6B7068] hover:text-[#10110F] hover:bg-[#F7F4ED]"
                          title="Edit plan"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePlan(plan.id)}
                          className="p-2 rounded-xl text-rose-700 hover:text-rose-900 hover:bg-rose-50"
                          title="Delete plan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Included Services */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#465640] block">
                        Included Treatments ({plan.services?.length || plan.serviceIds?.length || 0})
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {(plan.services || []).map((srv, idx) => (
                          <div key={idx} className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between">
                            <span className="font-bold text-[#10110F]">{srv.name}</span>
                            <span className="text-[#263D2B] font-semibold">${srv.price} CAD • {srv.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {plan.notes && (
                      <div className="text-xs text-[#465640] italic bg-[#F7F4ED]/50 p-3 rounded-2xl">
                        “{plan.notes}”
                      </div>
                    )}

                    {/* Plan Summary Bar */}
                    <div className="pt-3 border-t border-[#DCE1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="text-[#10110F]">
                        Estimated Total: <strong className="text-[#263D2B] text-sm">${plan.estimatedTotal} CAD</strong> • Total Duration: <strong>{plan.estimatedDuration}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to="/contact#custom-consultation"
                          className="px-4 py-2 rounded-xl border border-[#DCE1D8] hover:bg-[#F7F4ED] font-semibold text-[#10110F] transition-colors"
                        >
                          Submit Plan for Review
                        </Link>
                        {plan.serviceIds?.[0] && (
                          <Link
                            to={`/book-appointment?service=${plan.serviceIds[0]}`}
                            className="px-4 py-2 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white font-bold transition-colors shadow-xs"
                          >
                            Schedule Services
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 7: MY CONSULTATION HISTORY                                    */}
        {/* ================================================================= */}
        {activeTab === 'history' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            <div className="bg-white rounded-3xl border border-[#DCE1D8] p-5 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#10110F]">
                  Consultation Request History & Quotes
                </h3>
                <p className="text-xs text-[#465640]">
                  Track live salon evaluations, quotes provided, and decisions made in real time.
                </p>
              </div>

              <Link
                to="/contact#custom-consultation"
                className="px-4 py-2 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold transition-colors"
              >
                New Request
              </Link>
            </div>

            {consultationRequests.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#DCE1D8] p-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center mx-auto">
                  <Clock className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#10110F]">No Active Consultation Requests</h4>
                <p className="text-xs text-[#6B7068] max-w-md mx-auto">
                  You can submit a personalized look directly in the Custom Consultation Request section above.
                </p>
                <Link
                  to="/contact#custom-consultation"
                  className="inline-block px-5 py-2.5 rounded-xl bg-[#263D2B] text-white text-xs font-semibold"
                >
                  Start Custom Consultation
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {consultationRequests.map(req => (
                  <div
                    key={req.id}
                    className="bg-white rounded-3xl border border-[#DCE1D8] p-5 shadow-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE1D8] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#10110F]">{req.id}</span>
                        <span className="text-[#A8B5A0]">•</span>
                        <span className="text-xs text-[#6B7068]">{new Date(req.createdAt).toLocaleDateString()}</span>
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F7F4ED] text-[#263D2B] border border-[#DCE1D8]">
                        {req.status}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="font-serif text-base font-bold text-[#10110F]">
                          {req.serviceName}
                        </h4>
                        <p className="text-xs text-[#465640] italic mt-0.5 line-clamp-1">
                          “{req.customerVision || 'Custom bespoke look'}”
                        </p>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <div className="text-xs font-bold text-[#263D2B]">
                          {req.approvedPrice ? `$${req.approvedPrice} CAD` : 'Pending review'}
                        </div>
                        <div className="text-[11px] text-[#6B7068]">
                          {req.approvedDuration || 'To be confirmed'}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Link
                        to="/contact#custom-consultation"
                        className="text-xs font-bold text-[#263D2B] hover:underline flex items-center gap-1"
                      >
                        <span>Open in Consultation Tracker</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* MODAL 1: ADD CATALOG SERVICE MODAL                                */}
        {/* ================================================================= */}
        {showAddServiceModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden my-6">
              
              <div className="p-5 border-b border-[#DCE1D8] flex items-center justify-between bg-[#F7F4ED]">
                <h3 className="font-serif text-lg font-bold text-[#10110F]">
                  Save Service from Salon Catalog (85 Services)
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="p-2 rounded-xl text-[#6B7068] hover:text-[#10110F] hover:bg-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 border-b border-[#DCE1D8] space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A8B5A0]" />
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Search by name, description, or technique..."
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-[#F7F4ED] text-[#10110F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#263D2B]"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                  <button
                    type="button"
                    onClick={() => setCatalogCategory('all')}
                    className={`px-3 py-1 rounded-xl text-[11px] font-semibold ${
                      catalogCategory === 'all' ? 'bg-[#263D2B] text-white' : 'bg-[#F7F4ED] text-[#465640]'
                    }`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCatalogCategory(c.id)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-semibold ${
                        catalogCategory === c.id ? 'bg-[#263D2B] text-white' : 'bg-[#F7F4ED] text-[#465640]'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 overflow-y-auto flex-1 space-y-2.5">
                {catalogFilteredServices.map(service => (
                  <div
                    key={service.id}
                    className="p-3.5 rounded-2xl border border-[#DCE1D8] bg-[#F7F4ED]/40 hover:bg-white hover:border-[#263D2B] transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      {service.image ? (
                        <img src={service.image} alt={service.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-[#263D2B]/10 flex items-center justify-center font-bold text-sm text-[#263D2B] shrink-0">GJ</div>
                      )}
                      <div>
                        <div className="text-[10px] text-[#465640] uppercase font-bold">{service.categoryName || service.category}</div>
                        <h5 className="font-serif text-sm font-bold text-[#10110F]">{service.name}</h5>
                        <div className="text-xs text-[#263D2B] font-semibold">${service.price} CAD • {service.durationDisplay || service.duration || '45 min'}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddServiceToSaved(service)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold transition-colors shrink-0"
                    >
                      Save to Blueprint
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* MODAL 2: EDIT SAVED SERVICE NOTES                                 */}
        {/* ================================================================= */}
        {editingSavedService && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-3">
                <h4 className="font-serif text-base font-bold text-[#10110F]">
                  Edit Service Notes: {editingSavedService.serviceName}
                </h4>
                <button type="button" onClick={() => setEditingSavedService(null)}>
                  <X className="w-5 h-5 text-[#6B7068]" />
                </button>
              </div>

              <form onSubmit={handleSaveServiceEdit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#10110F] block mb-1">
                    Custom Options / Preferred Formula:
                  </label>
                  <input
                    type="text"
                    value={editingSavedService.customizationOptions || ''}
                    onChange={(e) => setEditingSavedService({ ...editingSavedService, customizationOptions: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-[#F7F4ED]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#10110F] block mb-1">
                    Personal Planning Notes:
                  </label>
                  <textarea
                    rows={3}
                    value={editingSavedService.personalNotes || ''}
                    onChange={(e) => setEditingSavedService({ ...editingSavedService, personalNotes: e.target.value })}
                    className="w-full p-3 text-xs rounded-xl border border-[#DCE1D8]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingSavedService(null)}
                    className="px-4 py-2 rounded-xl text-xs text-[#6B7068]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#263D2B] text-white text-xs font-bold"
                  >
                    Save Notes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* MODAL 3: ADD INSPIRATION PHOTO                                    */}
        {/* ================================================================= */}
        {newInspoModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-md w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-3">
                <h4 className="font-serif text-base font-bold text-[#10110F]">
                  Add Inspiration Photo to Blueprint
                </h4>
                <button type="button" onClick={() => setNewInspoModalOpen(false)}>
                  <X className="w-5 h-5 text-[#6B7068]" />
                </button>
              </div>

              <form onSubmit={handleSaveInspiration} className="space-y-3">
                {/* Image Upload Area */}
                <div>
                  <input
                    ref={inspoFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleInspoFileChange}
                    className="hidden"
                    id="blueprint-inspo-file"
                  />
                  {newInspoForm.dataUrl ? (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#DCE1D8]">
                      <img src={newInspoForm.dataUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setNewInspoForm({ ...newInspoForm, dataUrl: '' })}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="blueprint-inspo-file"
                      className="p-6 border-2 border-dashed border-[#DCE1D8] hover:border-[#263D2B] bg-[#F7F4ED]/50 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      <ImageIcon className="w-6 h-6 text-[#263D2B]" />
                      <span className="text-xs font-bold text-[#10110F]">Click to upload photo</span>
                      <span className="text-[10px] text-[#6B7068]">PNG, JPG up to 5MB</span>
                    </label>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#10110F] block mb-1">
                    Caption / Look Title:
                  </label>
                  <input
                    type="text"
                    value={newInspoForm.caption}
                    onChange={(e) => setNewInspoForm({ ...newInspoForm, caption: e.target.value })}
                    placeholder="e.g. Warm Honey Balayage with Face Framing Layers"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE1D8]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#10110F] block mb-1">
                    Collection / Category:
                  </label>
                  <select
                    value={newInspoForm.collection}
                    onChange={(e) => setNewInspoForm({ ...newInspoForm, collection: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-white"
                  >
                    <option value="Hair Inspiration">Hair Inspiration</option>
                    <option value="Nail Art">Nail Art</option>
                    <option value="Makeup Looks">Makeup Looks</option>
                    <option value="Bridal Ideas">Bridal Ideas</option>
                    <option value="Mehndi Designs">Mehndi Designs</option>
                    <option value="My Favourite Looks">My Favourite Looks</option>
                    <option value="Custom">Custom Collection Name</option>
                  </select>
                </div>

                {newInspoForm.collection === 'Custom' && (
                  <div>
                    <input
                      type="text"
                      value={newInspoForm.customCollection}
                      onChange={(e) => setNewInspoForm({ ...newInspoForm, customCollection: e.target.value })}
                      placeholder="Enter new collection name..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE1D8]"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-[#10110F] block mb-1">
                    Associate with Service (Optional):
                  </label>
                  <select
                    value={newInspoForm.associatedServiceId}
                    onChange={(e) => setNewInspoForm({ ...newInspoForm, associatedServiceId: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-white"
                  >
                    <option value="">None / General Inspiration</option>
                    {ALL_SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#10110F] block mb-1">
                    What do you like about this photo?
                  </label>
                  <textarea
                    rows={2}
                    value={newInspoForm.notes}
                    onChange={(e) => setNewInspoForm({ ...newInspoForm, notes: e.target.value })}
                    placeholder="e.g. Love the gloss finish, root shadow, and soft graduation."
                    className="w-full p-2.5 text-xs rounded-xl border border-[#DCE1D8]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setNewInspoModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-[#6B7068]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#263D2B] text-white text-xs font-bold"
                  >
                    Save Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* MODAL 4: CREATE JOURNAL ENTRY                                     */}
        {/* ================================================================= */}
        {newJournalModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#DCE1D8] pb-3">
                <h4 className="font-serif text-base font-bold text-[#10110F]">
                  Write Consultation Journal Note
                </h4>
                <button type="button" onClick={() => setNewJournalModalOpen(false)}>
                  <X className="w-5 h-5 text-[#6B7068]" />
                </button>
              </div>

              <form onSubmit={handleSaveJournalNote} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#10110F] block mb-1">
                    Entry Title / Topic:
                  </label>
                  <input
                    type="text"
                    value={newJournalForm.title}
                    onChange={(e) => setNewJournalForm({ ...newJournalForm, title: e.target.value })}
                    placeholder="e.g. Questions for Next Balayage Session"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE1D8]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#10110F] block mb-1">
                    Linked Service (Optional):
                  </label>
                  <select
                    value={newJournalForm.linkedServiceName}
                    onChange={(e) => setNewJournalForm({ ...newJournalForm, linkedServiceName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE1D8] bg-white"
                  >
                    <option value="">General Journal Note</option>
                    {ALL_SERVICES.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#10110F] block mb-1">
                    Personal Note / Custom Requirements:
                  </label>
                  <textarea
                    rows={4}
                    value={newJournalForm.content}
                    onChange={(e) => setNewJournalForm({ ...newJournalForm, content: e.target.value })}
                    placeholder="Record your thoughts, skin feedback, or questions for Janki..."
                    className="w-full p-3 text-xs rounded-xl border border-[#DCE1D8]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setNewJournalModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-[#6B7068]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#263D2B] text-white text-xs font-bold"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* MODAL 5: BEAUTY PLAN BUILDER MODAL                                */}
        {/* ================================================================= */}
        {planBuilderModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden my-6">
              
              <div className="p-5 border-b border-[#DCE1D8] flex items-center justify-between bg-[#F7F4ED]">
                <h3 className="font-serif text-lg font-bold text-[#10110F]">
                  {editingPlan ? 'Edit Beauty Plan' : 'Create Multi-Service Beauty Plan'}
                </h3>
                <button type="button" onClick={() => setPlanBuilderModalOpen(false)}>
                  <X className="w-5 h-5 text-[#6B7068]" />
                </button>
              </div>

              <form onSubmit={handleSavePlan} className="p-6 overflow-y-auto flex-1 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#10110F] block mb-1">
                      Plan Name:
                    </label>
                    <input
                      type="text"
                      value={planForm.title}
                      onChange={(e) => setPlanForm({ ...planForm, title: e.target.value })}
                      placeholder="e.g. Bridal Week Rituals"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE1D8]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#10110F] block mb-1">
                      Occasion / Event:
                    </label>
                    <input
                      type="text"
                      value={planForm.occasion}
                      onChange={(e) => setPlanForm({ ...planForm, occasion: e.target.value })}
                      placeholder="e.g. Wedding Reception Gala"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE1D8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#10110F] block mb-1">
                    Target Event Date (Optional):
                  </label>
                  <input
                    type="date"
                    value={planForm.targetDate}
                    onChange={(e) => setPlanForm({ ...planForm, targetDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE1D8]"
                  />
                </div>

                {/* Service Selector Checklist */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#263D2B] block mb-2">
                    Select Treatments to Include in Plan ({planForm.serviceIds.length} selected):
                  </label>
                  <div className="max-h-48 overflow-y-auto border border-[#DCE1D8] rounded-2xl p-2 space-y-1.5 bg-[#F7F4ED]/40">
                    {ALL_SERVICES.map(srv => {
                      const isSelected = planForm.serviceIds.includes(srv.id);
                      return (
                        <div
                          key={srv.id}
                          onClick={() => togglePlanService(srv.id)}
                          className={`p-2 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                            isSelected ? 'bg-[#263D2B] text-white font-bold' : 'bg-white text-[#10110F] hover:bg-[#F7F4ED]'
                          }`}
                        >
                          <span>{srv.name}</span>
                          <span className={isSelected ? 'text-white' : 'text-[#263D2B] font-semibold'}>
                            ${srv.price} CAD • {srv.durationDisplay || srv.duration}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#10110F] block mb-1">
                    Timeline & Sequence Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={planForm.notes}
                    onChange={(e) => setPlanForm({ ...planForm, notes: e.target.value })}
                    placeholder="e.g. Facial 4 days prior, balayage 1 week prior, nails the day before..."
                    className="w-full p-2.5 text-xs rounded-xl border border-[#DCE1D8]"
                  />
                </div>

                <div className="pt-3 border-t border-[#DCE1D8] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setPlanBuilderModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-[#6B7068]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#263D2B] hover:bg-[#1E3022] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Save Beauty Plan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
