"use client"

import { useEffect, useState } from "react"
import { DollarSign, FileSlidersIcon as Slider, Calculator, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { storageProviders } from "@/config/home.details"

export function SavingsCalculator() {
  const [storageSize, setStorageSize] = useState(50) // GB
  const [customProvider, setCustomProvider] = useState({
    name: "Custom Provider",
    costPerGB: 0.025,
    color: "#6B7280",
  })
  const [userSavingsData, setUserSavingsData] = useState({
    currentStorageUsed: 0.0, // GB
    totalImagesSaved: 0,
    monthsUsed: 0,
  });

  useEffect(() => {
    const storedLinks = (typeof window !== 'undefined') ? JSON.parse(localStorage.getItem('links') || '[]') : [];
    const totalImagesSaved = storedLinks.length.toLocaleString("en-IN");
    const totalSize = storedLinks.reduce((sum: number, file: { size: number }) => sum + file.size, 0);
    let monthsUsed = 1;
    if (totalImagesSaved > 0) {
      const createdDates = storedLinks
      .map((file: { createdOn?: string }) => file.createdOn)
      .filter(Boolean)
      .map((date: string) => new Date(date));
      if (createdDates.length > 0) {
      const oldest = new Date(Math.min(...createdDates.map((d: Date) => d.getTime())));
      const now = new Date();
      monthsUsed =
        (now.getFullYear() - oldest.getFullYear()) * 12 +
        (now.getMonth() - oldest.getMonth()) +
        1;
      }
    }
    setUserSavingsData({
      currentStorageUsed: Number((totalSize / (1024 * 1024 * 1024)).toFixed(4)), // bytes to GB
      totalImagesSaved,
      monthsUsed: monthsUsed, // or set dynamically if needed
    });
  }, []);

  const calculateMonthlyCost = (provider: any, sizeGB: number) => {
    return provider.costPerGB * sizeGB
  }

  const calculateYearlyCost = (provider: any, sizeGB: number) => {
    return calculateMonthlyCost(provider, sizeGB) * 12
  }

  const calculateUserSavings = (provider: any) => {
    const monthlySavings = calculateMonthlyCost(provider, userSavingsData.currentStorageUsed)
    const totalSaved = monthlySavings * userSavingsData.monthsUsed
    return { monthlySavings, totalSaved }
  }

  const allProviders = [...storageProviders, customProvider]

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculate Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">Savings</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how much you could save by switching to PicDB's free image storage
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-6xl mx-auto"
        >
          {/* Slider Card */}
          <motion.div
            variants={fadeIn}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Slider className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Storage Size Calculator</h3>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-medium text-gray-700">Storage Size</label>
                <div className="text-2xl font-bold text-blue-600">{storageSize} GB</div>
              </div>

              <input
                type="range"
                min="1"
                max="1000"
                value={storageSize}
                onChange={(e) => setStorageSize(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(storageSize / 1000) * 100}%, #E5E7EB ${(storageSize / 1000) * 100}%, #E5E7EB 100%)`,
                }}
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1 GB</span>
                <span>500 GB</span>
                <span>1000 GB</span>
              </div>
            </div>

            {/* Custom Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Provider Name</label>
                <input
                  type="text"
                  value={customProvider.name}
                  onChange={(e) =>
                    setCustomProvider((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cost per GB/month ($)</label>
                <input
                  type="number"
                  step="0.001"
                  value={customProvider.costPerGB}
                  onChange={(e) =>
                    setCustomProvider((prev) => ({ ...prev, costPerGB: Number(e.target.value) }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Provider Cards */}
          <motion.div
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {/* Free PicDB Card */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold">PicDB</h4>
                <div className="p-2 bg-white/20 rounded-lg">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2">$0.00</div>
              <p className="text-sm opacity-90">per month • {storageSize} GB</p>
              <div className="mt-4 p-3 bg-white/10 rounded-lg">
                <p className="text-sm font-medium">✨ Completely FREE!</p>
              </div>
            </motion.div>

            {/* Comparison Cards */}
            {allProviders.slice(0, 2).map((provider) => (
              <motion.div
                key={provider.name}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-gray-900">{provider.name}</h4>
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${provider.color}20` }}
                  >
                    <Calculator className="w-5 h-5" style={{ color: provider.color }} />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ${calculateMonthlyCost(provider, storageSize).toFixed(2)}
                </div>
                <p className="text-sm text-gray-600">per month • {storageSize} GB</p>
                <div className="mt-4 p-3 bg-red-50 rounded-lg">
                  <p className="text-sm font-medium text-red-600">
                    ${calculateYearlyCost(provider, storageSize).toFixed(2)}/year
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Savings Block */}
          <motion.div
            variants={fadeIn}
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Your Actual Savings with PicDB</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-1">{userSavingsData.currentStorageUsed} GB</div>
                <p className="text-sm opacity-90">Currently Using</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">{userSavingsData.totalImagesSaved.toLocaleString()}</div>
                <p className="text-sm opacity-90">Images Stored</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">{userSavingsData.monthsUsed}</div>
                <p className="text-sm opacity-90">Months Using PicDB</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">$0</div>
                <p className="text-sm opacity-90">Total Paid</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {storageProviders.map((provider) => {
                const savings = calculateUserSavings(provider)
                return (
                  <motion.div
                    key={provider.name}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 rounded-xl p-4 text-center"
                  >
                    <h4 className="font-semibold mb-2">vs {provider.name}</h4>
                    <div className="text-2xl font-bold mb-1">${savings.totalSaved.toFixed(4)}</div>
                    <p className="text-xs opacity-90">Total Saved</p>
                    <p className="text-xs opacity-75 mt-1">${savings.monthlySavings.toFixed(4)}/month</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
